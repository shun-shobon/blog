import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// @ts-ignore
import { InlineMath, BlockMath } from "react-katex";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import "katex/dist/katex.min.css";

export type Props = {
  contents: string;
};

export const Markdown = ({ contents }: Props): JSX.Element => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className="font-medium text-3xl border-b border-gray-300 mt-8"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="font-medium text-2xl border-b border-gray-300 mt-8"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="font-medium text-2xl mt-4" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="font-medium text-xl mt-4" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="font-medium text-lg mt-4" {...props} />
        ),
        h6: ({ node, ...props }) => <h6 className="text-lg mt-4" {...props} />,
        p: ({ node, ...props }) => <p className="text-base mt-2" {...props} />,
        pre: ({ children }) => (
          <div className="rounded-xl mt-2">{children}</div>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-200 pl-4 py-2 my-4 text-gray-500"
            {...props}
          />
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-5 mt-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 mt-2">{children}</ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        strong: ({ node, ...props }) => (
          <strong className="font-bold" {...props} />
        ),
        em: ({ node, ...props }) => <em className="font-italic" {...props} />,
        code: ({ node, inline, className, children, ...props }) => {
          if (inline) {
            return (
              <code
                className="inline-block rounded bg-gray-100 text-cyan-500 px-1.5"
                {...props}
              >
                {children}
              </code>
            );
          }

          const [, language] = /language-(\w+)/.exec(className ?? "") ?? [];
          return (
            <SyntaxHighlighter style={nord} language={language}>
              {children.toString().replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },
        del: ({ node, ...props }) => (
          <del className="line-through text-gray-400" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a
            className="text-cyan-500 hover:text-cyan-700 underline"
            {...node.properties}
            {...props}
          />
        ),
        // @ts-ignore
        math: ({ value }) => (
          <div className="w-full overflow-x-auto mt-2">
            <BlockMath>{value}</BlockMath>
          </div>
        ),
      }}
    >
      {contents}
    </ReactMarkdown>
  );
};
