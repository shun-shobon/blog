/** @jest-environment jsdom */

import { render } from "@testing-library/react";
import * as E from "fp-ts/Either";

import { Markdown } from "./Markdown";
import { getArticle } from "../../lib/blog";

describe("Markdown", () => {
  it("renders", async () => {
    const article = await getArticle(
      "tests/articles",
      "2021-12-05/test1/main.md",
    );

    expect(E.isRight(article)).toBeTruthy();
    if (E.isLeft(article)) return;

    const contents = article.right.contents;

    const component = render(<Markdown contents={contents} />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
