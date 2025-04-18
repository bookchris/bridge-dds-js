export function ddsErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message || "Unknown error";
  }
}
