import Image from "next/image";
import { type PhrasingContent } from "mdast";

export type PhrasingProps = {
  content: PhrasingContent;
};

const Phrasing = ({ content }: PhrasingProps): JSX.Element => {
  const f = (content: PhrasingContent, index: number) => (
    <Phrasing content={content} key={index} />
  );

  switch (content.type) {
    case "text":
      return <>{content.value}</>;
    case "emphasis":
      return <em>{content.children.map(f)}</em>;
    case "strong":
      return <strong>{content.children.map(f)}</strong>;
    case "delete":
      return <del>{content.children.map(f)}</del>;
    case "html":
      return <div dangerouslySetInnerHTML={{ __html: content.value }} />;
    case "inlineCode":
      return <code>{content.value}</code>;
    case "break":
      return <br />;
    case "image":
      return <Image src={content.url} alt={content.alt ?? undefined} />;
    case "link":
      return <a href={content.url}>{content.children.map(f)}</a>;
    case "imageReference":
    case "footnote":
    case "footnoteReference":
    case "linkReference":
      throw new Error("Not implemented");
  }
};

export default Phrasing;
