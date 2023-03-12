import classNames from "classnames";
import type { Heading as HeadingNode } from "mdast";

import { PhrasingContentList } from "@/components/markdown";

import { InternalLink } from "../InternalLink";
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
      <InternalLink href={href} className={styles.headingLink}>
        <PhrasingContentList footnoteDefs={[]}>{children}</PhrasingContentList>
      </InternalLink>
    </h2>
  );
}
