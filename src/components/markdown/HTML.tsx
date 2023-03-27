import type { HTML as HTMLNode } from "mdast";

interface Props {
  children: HTMLNode;
}

export function HTML({ children: { value } }: Props): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: value }} />;
}
