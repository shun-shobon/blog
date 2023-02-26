import type { HTML as HTMLNode } from "mdast";

type Props = {
  children: HTMLNode;
};

export function HTML({ children: { value } }: Props): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: value }} />;
}
