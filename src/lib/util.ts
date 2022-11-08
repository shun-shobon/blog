export function trying<T>(fn: () => T): T | Error {
  try {
    return fn();
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }

    return new Error("Unknown error");
  }
}
