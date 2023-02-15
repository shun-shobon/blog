import "@testing-library/jest-dom/extend-expect";

import { Temporal } from "@js-temporal/polyfill";

function arePlainDatesEqual(a, b) {
  const isAPlainDate = a instanceof Temporal.PlainDate;
  const isBPlainDate = b instanceof Temporal.PlainDate;

  if (isAPlainDate && isBPlainDate) {
    return a.equals(b);
  } else if (isAPlainDate !== isBPlainDate) {
    return false;
  } else {
    return undefined;
  }
}

expect.addEqualityTesters([arePlainDatesEqual]);
