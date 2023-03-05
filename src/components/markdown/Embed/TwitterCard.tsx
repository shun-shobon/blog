"use client";

import { useEffect, useRef, useState } from "react";

import type { Ogp } from "@/lib/ogp";

import styles from "./TwitterCard.module.css";

type Props = {
  ogp: Ogp;
  url: string;
};

export function TwitterCard({ url }: Props): JSX.Element {
  const [html, setHtml] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweetId = findTweetId(url);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const html = createTweetHtml(tweetId, isDark);
    setHtml(html);
  }, [url, setHtml]);

  useEffect(() => {
    if (!html || !ref.current) return;

    /* eslint-disable */
    // @ts-expect-error: `twttr` is defined in the Twitter script
    window.twttr?.widgets.load(ref.current);
    /* eslint-enable */
  }, [html, ref]);

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html ?? "" }}
      className={styles.wrapper}
    />
  );
}

function createTweetHtml(tweetId: string, isDark: boolean): string {
  return `<blockquote class="twitter-tweet" ${
    isDark ? 'data-theme="dark"' : ""
  }><a href="https://twitter.com/i/status/${tweetId}"></a></blockquote>`;
}

function findTweetId(url: string): string {
  const match = new URL(url).pathname.match(/\/status\/(?<id>\d+)/);
  const tweetId = match?.groups?.id;

  if (!tweetId) {
    throw new Error("Invalid tweet URL");
  }

  return tweetId;
}
