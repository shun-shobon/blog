"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import { PhrasingContentList } from "@/components/markdown";
import type { Article } from "@/lib/plugins";
import type { Toc } from "@/lib/plugins/remark-article/mdast-toc";

import styles from "./ArticleToc.module.css";

type Props = {
  article: Article;
  className?: string | undefined;
};

export function ArticleToc({ article, className }: Props): JSX.Element | null {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (event) => {
        const id = event.find((e) => e.isIntersecting)?.target.id;

        if (!id) return;
        setActiveIds([id]);
      },
      {
        root: null,
        rootMargin: "-80px 0px -50% 0px",
        threshold: [0.0, 1.0],
      },
    );

    const subscribe = (item: Toc) => {
      const id = item.heading.identifier ?? "fake";

      const $heading = document.querySelector(`#${id}`);
      if (!$heading) return;

      observer.observe($heading);
      item.children.forEach(subscribe);
    };
    article.toc.forEach(subscribe);

    return () => {
      observer.disconnect();
    };
  }, [article]);

  return (
    <div className={className}>
      <nav className={styles.nav}>
        <h2 className={styles.title}>目次</h2>
        <ul>
          {article.toc.map((item) => (
            <TocItem
              key={item.heading.identifier ?? ""}
              toc={item}
              activeIds={activeIds}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

type TocItemProps = {
  toc: Toc;
  activeIds: string[];
};

export function TocItem({ toc, activeIds }: TocItemProps): JSX.Element {
  const id = toc.heading.identifier ?? "fake";

  return (
    <li className={styles.item}>
      <a
        href={`#${id}`}
        className={classNames(
          styles.link,
          activeIds.includes(id) && styles.linkActive,
        )}
      >
        <PhrasingContentList footnoteDefs={[]}>
          {toc.heading.children}
        </PhrasingContentList>
      </a>
      {toc.children.length > 0 && (
        <ul className={styles.list}>
          {toc.children.map((item) => (
            <TocItem
              key={item.heading.identifier ?? ""}
              toc={item}
              activeIds={activeIds}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
