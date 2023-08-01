import { FaGithub, FaTwitter } from "react-icons/fa";

import { TITLE } from "@/config";
import { getArticleUrl, getEditArticleUrl } from "@/lib/utils";

import styles from "./ArticleFooter.module.css";
import { ShareButton } from "./ShareButton";

interface Props {
  plainTitle: string;
  slug: string;
}

export function ArticleFooter({ plainTitle, slug }: Props): JSX.Element {
  const editUrl = getEditArticleUrl(slug);

  const title = `${plainTitle} | ${TITLE.replaceAll(".", "․")}`;
  const url = getArticleUrl(slug).href;

  const twitterUrl = new URL("https://twitter.com/share");
  twitterUrl.searchParams.set("text", title);
  twitterUrl.searchParams.set("url", url);
  twitterUrl.searchParams.set("via", "shun_shobon");
  twitterUrl.searchParams.set("related", "shun_shobon");

  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.editButtonWrapper}>
          <a
            href={editUrl.href}
            target="_blank"
            rel="noreferrer"
            className={styles.editButton}
          >
            <FaGithub className={styles.icon} />
            編集の提案をする
          </a>
        </li>
        <li>
          <a
            href={twitterUrl.toString()}
            target="_blank"
            rel="noreferrer"
            className={styles.shareButton}
          >
            <FaTwitter className={styles.icon} />
            ツイート
          </a>
        </li>
        <ShareButton title={title} url={url} />
      </ul>
    </footer>
  );
}
