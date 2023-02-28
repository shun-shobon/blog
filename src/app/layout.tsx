import "@acab/reset.css";
import "./reset.css";
import "./color.css";
import "katex/dist/katex.min.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { createOgpImageUrl } from "@/lib/ogp-image";

import { Header } from "./Header";
import styles from "./layout.module.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <html lang="ja">
      <body className={styles.body}>
        <Header />
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "blog.s2n.tech",
  description:
    "しゅん🌙(@shun_shobon)のブログサイトです。技術記事からポエムまで色々書きます。",
  referrer: "strict-origin-when-cross-origin",
  authors: [{ name: "しゅん🌙", url: "https://s2n.tech" }],
  themeColor: "#2c363f",
  colorScheme: "dark light",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: "blog.s2n.tech",
    description:
      "しゅん🌙(@shun_shobon)のブログサイトです。技術記事からポエムまで色々書きます。",
    url: "https://blog.s2n.tech",
    siteName: "blog.s2n.tech",
    locale: "ja-JP",
    type: "website",
    images: [
      {
        url: createOgpImageUrl("blog.s2n.tech"),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shun_shobon",
  },
};
