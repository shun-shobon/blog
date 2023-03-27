import classNames from "classnames";
import type {
  FootnoteDefinition as FootnoteDefinitionsNode,
  Heading as HeadingNode,
} from "mdast";
import { FiLink } from "react-icons/fi";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  className?: string | undefined;
  children: HeadingNode;
  footnoteDefs: Array<FootnoteDefinitionsNode>;
}

export function Heading({
  children: { children, depth, identifier },
  footnoteDefs,
  className,
}: Props): JSX.Element {
  const Tag = `h${depth}` as const;

  return (
    <Tag id={identifier} className={classNames(styles.heading, className)}>
      {depth > 1 && identifier != null && (
        <a
          href={`#${identifier}`}
          className={styles.headingLink}
          aria-hidden="true"
        >
          <FiLink className={styles.headingLinkIcon} />
        </a>
      )}
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </Tag>
  );
}
