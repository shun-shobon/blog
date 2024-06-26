import "the-new-css-reset/css/reset.css";
import "./reset.css";
import "./variable.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { GTM, GTMNoScript } from "@/components/GTM";
import { ProgressBar } from "@/components/ProgressBar";
import { ORIGIN, TITLE } from "@/config";
import { createOgpImageUrl } from "@/lib/ogp-image";

import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./layout.module.css";

interface Props {
  children: ReactNode;
}

export const runtime = "edge";

export default function Layout({ children }: Props): JSX.Element {
  const nonce = headers().get("X-CSP-Nonce") ?? "";

  return (
    <html lang="ja">
      <body className={styles.body}>
        <GTM nonce={nonce} />
        <GTMNoScript />
        <ProgressBar />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#79b4e4",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: TITLE,
  description:
    "しゅん🌙(@shun_shobon)のブログサイトです。技術記事からポエムまで色々書きます。",
  referrer: "strict-origin-when-cross-origin",
  authors: [{ name: "しゅん🌙", url: "https://s2n.tech" }],
  alternates: {
    types: {
      "application/atom+xml": "/feed",
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: {
      rel: "manifest",
      url: "/manifest.webmanifest",
    },
  },
  openGraph: {
    title: TITLE,
    description:
      "しゅん🌙(@shun_shobon)のブログサイトです。技術記事からポエムまで色々書きます。",
    url: ORIGIN,
    siteName: TITLE,
    locale: "ja-JP",
    type: "website",
    images: createOgpImageUrl(),
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shun_shobon",
  },
  other: {
    "twitter:dnt": "on",
    "twitter:widgets:csp": "on",
  },
};
