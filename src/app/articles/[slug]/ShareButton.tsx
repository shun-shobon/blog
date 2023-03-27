"use client";

import { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";

import styles from "./ArticleFooter.module.css";

interface Props {
  title: string;
  url: string;
}

export function ShareButton({ title, url }: Props): JSX.Element | null {
  const [isShareApiSupported, setIsShareApiSupported] = useState(false);
  useEffect(() => {
    setIsShareApiSupported("share" in navigator);
  }, []);

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

  return isShareApiSupported ? (
    <li>
      <button onClick={handleShareButtonClick} className={styles.shareButton}>
        <FaShare className={styles.icon} />
        共有...
      </button>
    </li>
  ) : null;
}
