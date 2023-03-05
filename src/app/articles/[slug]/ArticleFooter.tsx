import { FaGithub } from "react-icons/fa";

import { ShareButtons } from "@/components/ShareButtons";
import { getEditArticleUrl } from "@/lib/utils";

import styles from "./ArticleFooter.module.css";

type Props = {
  title: string;
  slug: string;
};

export function ArticleFooter({ title, slug }: Props): JSX.Element {
  const editUrl = getEditArticleUrl(slug);

  return (
    <footer className={styles.footer}>
      <ShareButtons plainTitle={title} slug={slug} />
      <a
        href={editUrl.href}
        target="_blank"
        rel="noreferer"
        className={styles.editButton}
      >
        <FaGithub className={styles.editButtonIcon} />
        編集の提案をする
      </a>
    </footer>
  );
}
