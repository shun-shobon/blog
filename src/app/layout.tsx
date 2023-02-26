import "@acab/reset.css";
import "./reset.css";
import "./color.css";
import "katex/dist/katex.min.css";

import type { ReactNode } from "react";

import { Header } from "./Header";
import styles from "./layout.module.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <html lang="ja">
      <head>
        <title>星朧の夜</title>
      </head>
      <body className={styles.body}>
        <Header />
        {children}
      </body>
    </html>
  );
}
