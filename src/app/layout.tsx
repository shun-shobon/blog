import "@/styles/global.css";

import type { ReactNode } from "react";

import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <html lang="ja">
      <head>
        <title>星朧の夜</title>
      </head>
      <body className="bg-slate-50 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
        <Header />
        {children}
      </body>
    </html>
  );
}
