import classNames from "classnames";
import type { ComponentProps } from "react";

import type { Article } from "@/lib/plugins";

import styles from "./ArticleTag.module.css";
import { InternalLink } from "./InternalLink";

type Props = {
  children: string[] | Map<string, Article[]>;
} & ComponentProps<"ul">;

export function ArticleTags({
  children,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <ul className={classNames(styles.tags, className)} {...props}>
      {Array.isArray(children)
        ? children.map((tag) => <ArticleTag key={tag}>{tag}</ArticleTag>)
        : Array.from(children.entries())
            .sort(([_a, a], [_b, b]) => b.length - a.length)
            .map(([tag, articles]) => (
              <ArticleTag key={tag} count={articles.length}>
                {tag}
              </ArticleTag>
            ))}
    </ul>
  );
}

type ArticleTagProps = {
  children: string;
  count?: number | undefined;
};

function ArticleTag({ children, count }: ArticleTagProps): JSX.Element {
  return (
    <li>
      <InternalLink href={`/tags/${children}`} className={styles.tag}>
        {children}
        {count && ` (${count})`}
      </InternalLink>
    </li>
  );
}
