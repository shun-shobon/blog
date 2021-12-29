import { type ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

export type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export const Layout = ({
  children,
  title,
  description,
}: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{`${title} | 高専生はエンジニアの夢を見るか？`}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content="blog.s2n.tech" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://source.unsplash.com/random/1200x630"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shun_shobon" />
        <meta
          property="og:site_name"
          content="高専生はエンジニアの夢を見るか？"
        />
        <meta property="og:locale" content="ja_JP" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
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
