import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  List as ListNode,
} from "mdast";

import { ListItem } from "./ListItem";
import styles from "./markdown.module.css";

type Props = {
  children: ListNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function List({
  children: { children, ordered, start },
  footnoteDefs,
}: Props): JSX.Element {
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag start={start ?? undefined} className={styles.list}>
      {children.map((child, idx) => (
        <ListItem key={idx} footnoteDefs={footnoteDefs}>
          {child}
        </ListItem>
      ))}
    </Tag>
  );
}
