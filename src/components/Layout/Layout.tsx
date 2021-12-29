import { type ReactNode } from "react";
import Link from "next/link";

export type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <header className="py-8 grid place-items-center">
        <Link href="/">
          <a className="text-center hover:opacity-50">
            <h1 className="text-2xl">高専生はエンジニアの夢を見るか？</h1>
            <h2 className="text-gray-500">しがない高専生の雑多ブログ</h2>
          </a>
        </Link>
      </header>
      {children}
      <footer className="py-2 border-t border-gray-300 text-center text-gray-500">
        Copyright©2021 Shuntaro Nishizawa
      </footer>
    </>
  );
};
