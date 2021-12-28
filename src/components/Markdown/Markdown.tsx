import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Props = {
  contents: string;
};

export const Markdown = ({ contents }: Props): JSX.Element => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown>;
};
