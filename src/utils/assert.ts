import * as E from "fp-ts/lib/Either";

export function assertRight<A>(
  e: E.Either<unknown, A>,
): asserts e is E.Right<A> {
  if (E.isLeft(e)) {
    throw new Error(`Expected Right, got Left: ${e.left}`);
  }
}
