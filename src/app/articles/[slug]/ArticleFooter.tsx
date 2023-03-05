import { ShareButtons } from "@/components/ShareButtons";

import styles from "./ArticleFooter.module.css";

type Props = {
  title: string;
  slug: string;
};

export function ArticleFooter({ title, slug }: Props): JSX.Element {
  return (
    <footer className={styles.footer}>
      <ShareButtons plainTitle={title} slug={slug} />
    </footer>
  );
}
