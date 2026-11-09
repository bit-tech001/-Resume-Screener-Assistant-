
const COOKIE_NAME = "synthweb_session";

const REDIRECT_COOKIE_NAME = "synthweb_next";

const REDIRECT_MAX_AGE_SECONDS = 60 * 10;

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export {
  COOKIE_NAME,
  REDIRECT_COOKIE_NAME,
  REDIRECT_MAX_AGE_SECONDS,
  SESSION_MAX_AGE_SECONDS,
};

export interface SessionPayload {
  uid: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing SESSION_SECRET environment variable.");
  }

  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");

  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return toBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let diff = 0;

  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return diff === 0;
}

export async function createSessionToken(
  userId: string
): Promise<string> {
  const payload: SessionPayload = {
    uid: userId,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const encoded = toBase64Url(
    new TextEncoder().encode(JSON.stringify(payload))
  );

  const signature = await sign(encoded);

  return `${encoded}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [encoded, signature] = parts;

  if (!encoded || !signature) {
    return null;
  }

  const expected = await sign(encoded);

  if (!safeEqual(signature, expected)) {
    return null;
  }

  try {
    const json = new TextDecoder().decode(fromBase64Url(encoded));
    const payload = JSON.parse(json) as SessionPayload;

    if (
      typeof payload.uid !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp <= Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
