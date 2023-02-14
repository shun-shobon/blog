import "@/styles/global.css";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <html lang="ja">
      <head>
        <title>Blog</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
