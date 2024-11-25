"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  url: string;
}

export function TwitterCard({ url }: Props): JSX.Element {
  const [html, setHtml] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweetId = findTweetId(url);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const html = createTweetHtml(tweetId, isDark);
    setHtml(html);
  }, [url, setHtml]);

  useEffect(() => {
    if (!html || !ref.current) return;

    window.twttr?.widgets.load(ref.current);
  }, [html, ref]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}

function createTweetHtml(tweetId: string, isDark: boolean): string {
  return `<blockquote class="twitter-tweet" ${
    isDark ? 'data-theme="dark"' : ""
  } data-align="center"><a href="https://twitter.com/i/status/${tweetId}"></a></blockquote>`;
}

function findTweetId(url: string): string {
  const match = new URL(url).pathname.match(/\/status\/(?<id>\d+)/u);
  const tweetId = match?.groups?.id;

  if (tweetId == null) {
    throw new Error("Invalid tweet URL");
  }

  return tweetId;
}
