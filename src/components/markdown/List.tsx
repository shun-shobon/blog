import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  List as ListNode,
} from "mdast";

import { ListItem } from "./ListItem";
import styles from "./markdown.module.css";

interface Props {
  children: ListNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function List({
  children: { children, ordered, start },
  footnoteDefs,
}: Props): JSX.Element {
  const Tag = ordered === true ? "ol" : "ul";

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
