import type { EmojiEntity } from "twemoji-parser";
import { parse } from "twemoji-parser";

import styles from "./Twemoji.module.css";

interface Props {
  children: string;
}

export function Twemoji({ children }: Props): JSX.Element {
  const parsed = parse(children, {
    assetType: "svg",
    buildUrl: (codePoint, assetType) =>
      `${TWEMOJI_URL}${codePoint}.${assetType}`,
  });

  const nodes: Array<string | EmojiEntity> = [children];
  parsed.forEach((entity) => {
    const lastIdx = nodes.length - 1;
    const lastNode = nodes[lastIdx] as string;
    const beforeLength = nodes
      .filter((node): node is string => typeof node === "string")
      .slice(0, -1)
      .join("").length;

    const before = lastNode.slice(0, entity.indices[0] - beforeLength);
    const after = lastNode.slice(entity.indices[1] - beforeLength);

    nodes.splice(lastIdx, 1, before, entity, after);
  });

  return (
    <>
      {nodes.map((node, idx) =>
        typeof node === "string" ? (
          node
        ) : (
          <img
            key={idx}
            draggable={false}
            src={node.url}
            alt={node.text}
            className={styles.twemoji}
          />
        ),
      )}
    </>
  );
}

const TWEMOJI_URL =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/";
