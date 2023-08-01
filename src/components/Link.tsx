import { InternalLink } from "./InternalLink";

interface Props {
  href: string;
  title?: string | undefined;
  className?: string | undefined;
  children?: React.ReactNode;
}

export function Link({ href, children, ...props }: Props): JSX.Element {
  return isLocalLink(href) ? (
    <InternalLink href={href} {...props}>
      {children}
    </InternalLink>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

function isLocalLink(url: string): boolean {
  try {
    new URL(url);
    return false;
  } catch {
    return true;
  }
}
