/** @jest-environment jsdom */

import { render } from "@testing-library/react";

import Phrasing from "./Phrasing";

import { assertRight } from "../../../utils/assert";
import { getArticle } from "../../../lib/blog";
import { type Paragraph } from "mdast";

describe("Phrasing", () => {
  it("renders", async () => {
    const article = await getArticle(
      "tests/articles",
      "2021-12-05/test1/main.md",
    );
    assertRight(article);
    const contents = (article.right.contents.children[11] as Paragraph)
      .children;

    const component = render(
      <>
        {contents.map((content, index) => (
          <Phrasing content={content} key={index} />
        ))}
      </>,
    );

    expect(component.getByText("Bold")).toBeInTheDocument();
    expect(component.getByText("Italic")).toBeInTheDocument();
    expect(component.getByText("Bold Italic")).toBeInTheDocument();
    expect(component.getByText("Inline Code")).toBeInTheDocument();
    expect(component.getByText("Strikethrough")).toBeInTheDocument();

    expect(component.asFragment()).toMatchSnapshot();
  });
});
