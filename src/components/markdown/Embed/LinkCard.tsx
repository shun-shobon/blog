import type { Ogp } from "@/lib/ogp";
import { FAVICON_SIZE } from "@/lib/ogp";

import styles from "./LinkCard.module.css";

type Props = {
  ogp: Ogp;
  url: string;
};

export function LinkCard({ ogp, url }: Props): JSX.Element {
  return (
    <a href={url} className={styles.embedWrapper}>
      <article className={styles.embed}>
        <div className={styles.embedText}>
          <h2 className={styles.embedTextTitle}>{ogp.title}</h2>
          <p className={styles.embedTextDescription}>{ogp.description}</p>
          <footer className={styles.embedTextSite}>
            <img
              src={ogp.favicon ?? ""}
              width={FAVICON_SIZE}
              height={FAVICON_SIZE}
              alt=""
              className={styles.embedTextSiteImage}
            />
            <span className={styles.embedTextSiteName}>{ogp.site}</span>
          </footer>
        </div>
        {ogp.image && (
          <img alt="" src={ogp.image} className={styles.embedImage} />
        )}
      </article>
    </a>
  );
}
