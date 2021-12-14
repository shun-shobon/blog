export function assertNonNull<T>(obj: T): asserts obj is NonNullable<T> {
  if (obj == null) {
    throw new Error(`Expected non-null value, but received ${obj}`);
  }
}
