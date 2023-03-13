"use client";

import classNames from "classnames";
import { useEffect } from "react";

import { PhrasingContentList } from "@/components/markdown";
import type { Article } from "@/lib/plugins";
import type { Toc } from "@/lib/plugins/remark-article/mdast-toc";

type Props = {
  article: Article;
  className?: string | undefined;
};

export function ArticleToc({ article, className }: Props): JSX.Element | null {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (event) => {
        console.log(event);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [1],
      },
    );

    article.toc.forEach((item) => {
      const id = `#${item.heading.identifier ?? "fake"}`;

      const $heading = document.querySelector(id);
      if (!$heading) return;

      observer.observe($heading);
    });
  }, [article]);

  return (
    <nav className={classNames(className)}>
      <ul>
        {article.toc.map((item) => (
          <TocItem key={item.heading.identifier ?? ""} toc={item} />
        ))}
      </ul>
    </nav>
  );
}

type TocItemProps = {
  toc: Toc;
};

export function TocItem({ toc }: TocItemProps): JSX.Element {
  return (
    <li>
      <a href={`#${toc.heading.identifier ?? ""}`}>
        <PhrasingContentList footnoteDefs={[]}>
          {toc.heading.children}
        </PhrasingContentList>
      </a>
      {toc.children.length > 0 && (
        <ul>
          {toc.children.map((item) => (
            <TocItem key={item.heading.identifier ?? ""} toc={item} />
          ))}
        </ul>
      )}
    </li>
  );
}
