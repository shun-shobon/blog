import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export type Props = {
  contents: string;
};

export const Markdown = ({ contents }: Props): JSX.Element => {
  return (
    <section>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="font-medium text-3xl border-b border-gray-300 mb-4"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="font-medium text-2xl border-b border-gray-300 mb-4"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="font-medium text-2xl mb-4" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="font-medium text-xl mb-4" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="font-medium text-lg mb-4" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-lg mb-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-base mb-2" {...props} />
          ),
          pre: ({ children }) => (
            <div className="rounded-xl mb-2">{children}</div>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-200 pl-4 py-2 my-4 text-gray-500"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 mb-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 mb-2" {...props} />
          ),
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
        }}
      >
        {contents}
      </ReactMarkdown>
    </section>
  );
};
