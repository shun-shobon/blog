import classNames from "classnames";
import type { Heading as HeadingNode } from "mdast";
import Link from "next/link";

import { PhrasingContentList } from "@/components/markdown";

import styles from "./ArticleCardHeading.module.css";

type HeadingProps = {
  children: HeadingNode;
  slug: string;
  className?: string;
};
export function Heading({
  children: { children, identifier },
  slug,
  className,
}: HeadingProps): JSX.Element {
  const href = `/articles/${slug}`;

  return (
    <h2 id={identifier} className={classNames(styles.heading, className)}>
      <Link href={href} className={styles.headingLink}>
        <PhrasingContentList footnoteDefs={[]}>{children}</PhrasingContentList>
      </Link>
    </h2>
  );
}
