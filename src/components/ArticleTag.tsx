import classNames from "classnames";
import NextLink from "next/link";
import type { ComponentProps } from "react";

import styles from "./ArticleTag.module.css";

type Props = {
  children: string[];
} & ComponentProps<"ul">;

export function ArticleTags({
  children,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <ul className={classNames(styles.tags, className)} {...props}>
      {children.map((tag) => (
        <ArticleTag key={tag}>{tag}</ArticleTag>
      ))}
    </ul>
  );
}

type ArticleTagProps = {
  children: string;
};

function ArticleTag({ children }: ArticleTagProps): JSX.Element {
  return (
    <li>
      <NextLink href={`/tags/${children}`} className={styles.tag}>
        {children}
      </NextLink>
    </li>
  );
}
