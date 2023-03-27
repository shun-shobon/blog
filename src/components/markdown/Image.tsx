import type { Image as ImageNode } from "mdast";

import styles from "./markdown.module.css";

interface Props {
  children: ImageNode;
}

export function Image({ children: { alt, title, url } }: Props): JSX.Element {
  return (
    <img
      alt={alt ?? undefined}
      title={title ?? undefined}
      src={url}
      loading="lazy"
      className={styles.image}
    />
  );
}
