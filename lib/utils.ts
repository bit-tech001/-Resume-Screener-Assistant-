
export function truncateText(
  text: string,
  maxLength: number
): string {
  const cleanedText = text.trim();

  if (cleanedText.length <= maxLength) {
    return cleanedText;
  }

  return (
    cleanedText.slice(0, maxLength) +
    "\n\n[Content truncated to fit analysis limits]"
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}
