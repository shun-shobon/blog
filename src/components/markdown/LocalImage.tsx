import NextImage from "next/image";

import type { LocalImage as LocalImageNode } from "@/lib/plugins";

import styles from "./markdown.module.css";

interface Props {
  children: LocalImageNode;
}

export function LocalImage({
  children: { alt, title, url, width, height },
}: Props): JSX.Element {
  return (
    <NextImage
      alt={alt ?? ""}
      title={title ?? undefined}
      src={url}
      width={width}
      height={height}
      className={styles.image}
    />
  );
}
