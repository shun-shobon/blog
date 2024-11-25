import { FAVICON_SIZE, fetchOgp } from "@/lib/ogp";

import styles from "./LinkCard.module.css";

interface Props {
  url: string;
}

export async function LinkCard({ url }: Props): Promise<JSX.Element> {
  const ogp = await fetchOgp(url).catch(() => ({
    title: url,
    description: undefined,
    image: undefined,
    site: url,
    favicon: undefined,
  }));

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
        {ogp.image != null && (
          <img alt="" src={ogp.image} className={styles.embedImage} />
        )}
      </article>
    </a>
  );
}
