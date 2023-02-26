import type { Image as ImageNode } from "mdast";

type Props = {
  children: ImageNode;
};

export function Image({ children: { alt, title, url } }: Props): JSX.Element {
  return (
    // SAFETY: `ImageNode` is foreign image node.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? undefined} title={title ?? undefined} src={url} />
  );
}
