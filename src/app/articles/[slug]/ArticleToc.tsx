"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import { PhrasingContentList } from "@/components/markdown";
import type { Article } from "@/lib/plugins";
import type { Toc } from "@/lib/plugins/remark-article/mdast-toc";

import styles from "./ArticleToc.module.css";

interface Props {
  article: Article;
  className?: string | undefined;
}

export function ArticleToc({ article, className }: Props): JSX.Element | null {
  const [activeIds, setActiveIds] = useState<Array<string>>([]);

  useEffect(() => {
    const inObserver = new IntersectionObserver(
      (event) => {
        const outIds = event
          .filter((entry) => !entry.isIntersecting)
          .map((entry) => {
            const $heading = entry.target.querySelector("h1,h2,h3,h4,h5,h6");
            if (!$heading) return;
            return $heading.id;
          })
          .filter((id): id is string => id !== undefined);
        const inIds = event
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const $heading = entry.target.querySelector("h1,h2,h3,h4,h5,h6");
            if (!$heading) return;
            return $heading.id;
          })
          .filter((id): id is string => id !== undefined);

        setActiveIds((prev) => [
          ...prev.filter((id) => !outIds.includes(id)),
          ...inIds,
        ]);
      },
      {
        root: null,
        rootMargin: "-80px 0px 0px 0px",
        threshold: [0.0],
      },
    );

    const subscribe = (item: Toc) => {
      const id = item.heading.identifier ?? "fake";

      const $heading = document.getElementById(id);
      if (!$heading) return;

      const $section = $heading.closest("section");
      if (!$section) return;

      inObserver.observe($section);
      item.children.forEach(subscribe);
    };
    article.toc.forEach(subscribe);

    return () => {
      inObserver.disconnect();
    };
  }, [article]);

  return (
    <div className={className}>
      <nav className={styles.nav}>
        <h2 className={styles.title}>目次</h2>
        <ul className={styles.list}>
          {article.toc.map((item) => (
            <TocItem
              key={item.heading.identifier ?? ""}
              toc={item}
              activeIds={activeIds}
              level={1}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

interface TocItemProps {
  toc: Toc;
  activeIds: Array<string>;
  level: number;
}

export function TocItem({ toc, activeIds, level }: TocItemProps): JSX.Element {
  const id = toc.heading.identifier ?? "fake";

  return (
    <li
      className={classNames(
        styles.item,
        activeIds.includes(id) && styles.active,
      )}
    >
      <a href={`#${id}`} className={styles.link}>
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
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
