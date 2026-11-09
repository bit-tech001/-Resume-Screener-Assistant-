
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import {
  createSession,
  destroySession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import {
  REDIRECT_COOKIE_NAME,
} from "@/lib/session";
import {
  loginFormSchema,
  signupFormSchema,
} from "@/schemas/auth.schema";
import type {
  AuthFormErrors,
  AuthFormState,
} from "@/types/auth.types";
import type { ZodIssue } from "zod";

function toFieldErrors(
  issues: ZodIssue[]
): AuthFormErrors {
  const errors: AuthFormErrors = {};

  for (const issue of issues) {
    const key = issue.path[0];

    if (key !== "name" && key !== "email" && key !== "password") {
      continue;
    }

    const messages = errors[key] ?? [];
    messages.push(issue.message);
    errors[key] = messages;
  }

  return errors;
}

async function consumeRedirectPath(): Promise<string> {
  const store = await cookies();
  const raw = store.get(REDIRECT_COOKIE_NAME)?.value;

  await store.delete(REDIRECT_COOKIE_NAME);

  let value = typeof raw === "string" ? raw : "";

  if (value && !value.startsWith("/")) {
    try {
      value = decodeURIComponent(value);
    } catch {
      value = "";
    }
  }

  const isInternal =
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/login") &&
    !value.startsWith("/signup");

  return isInternal ? value : "/dashboard";
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = signupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      errors: toFieldErrors(parsed.error.issues),
      message: "Please fix the highlighted fields.",
    };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });

  if (existing) {
    return {
      message:
        "An account with this email already exists. Try logging in instead.",
      errors: {
        email: ["This email is already registered."],
      },
    };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
    },
  });

  await createSession(user.id);

  redirect(await consumeRedirectPath());
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      errors: toFieldErrors(parsed.error.issues),
      message: "Please fix the highlighted fields.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user) {
    return {
      message: "Invalid email or password.",
    };
  }

  const validPassword = await verifyPassword(
    parsed.data.password,
    user.passwordHash
  );

  if (!validPassword) {
    return {
      message: "Invalid email or password.",
    };
  }

  await createSession(user.id);

  redirect(await consumeRedirectPath());
}

export async function logout(): Promise<void> {
  await destroySession();

  redirect("/login");
}
