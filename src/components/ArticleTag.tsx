import NextLink from "next/link";

import styles from "./ArticleTag.module.css";

type Props = {
  children: string[];
};

export function ArticleTags({ children }: Props): JSX.Element {
  return (
    <ul className={styles.tags}>
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
