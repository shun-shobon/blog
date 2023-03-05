"use client";

import { useEffect, useState } from "react";
import { FaShare, FaTwitter } from "react-icons/fa";

import { TITLE } from "@/config";
import { getArticleUrl } from "@/lib/utils";

import styles from "./ShareButtons.module.css";

type Props = {
  plainTitle: string;
  slug: string;
};

export function ShareButtons({ plainTitle, slug }: Props): JSX.Element {
  const [isShareApiSupported, setIsShareApiSupported] = useState(false);
  useEffect(() => {
    setIsShareApiSupported("share" in navigator);
  }, []);

  const title = `${plainTitle} | ${TITLE}\n`;
  const url = getArticleUrl(slug).href;

  const twitterUrl = new URL("https://twitter.com/share");
  twitterUrl.searchParams.set("text", title);
  twitterUrl.searchParams.set("url", url);
  twitterUrl.searchParams.set("via", "shun_shobon");
  twitterUrl.searchParams.set("related", "shun_shobon");

  const handleShareButtonClick = () => {
    void navigator
      .share({
        title,
        url,
      })
      .catch(() => {
        /* noop */
      });
  };

  return (
    <ul className={styles.shareList}>
      <li>
        <a
          href={twitterUrl.toString()}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <FaTwitter className={styles.linkIcon} />
          ツイート
        </a>
      </li>
      {isShareApiSupported && (
        <li>
          <button onClick={handleShareButtonClick} className={styles.link}>
            <FaShare className={styles.linkIcon} />
            共有...
          </button>
        </li>
      )}
    </ul>
  );
}
