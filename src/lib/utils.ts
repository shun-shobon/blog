export class UnreachableError extends Error {
  constructor() {
    super();

    this.name = "UnreachableError";
  }
}
