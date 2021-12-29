/** @jest-environment jsdom */

import { render } from "@testing-library/react";

import { Summary } from "./Summary";
import { getArticle } from "../../lib/blog";
import * as E from "fp-ts/Either";

describe("Summary", () => {
  it("renders", async () => {
    const article = await getArticle(
      "tests/articles",
      "2021-12-05/test1/main.md",
    );

    expect(E.isRight(article)).toBeTruthy();
    if (E.isLeft(article)) return;

    const component = render(<Summary article={article.right} />);

    expect(component.getByText("Test Article 1")).toBeInTheDocument();

    expect(component.asFragment()).toMatchSnapshot();
  });
});
