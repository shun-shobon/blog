import { FAVICON_SIZE, fetchOgp } from "@/lib/ogp";
import type { Embed as EmbedNode } from "@/lib/plugins";

import styles from "./Embed.module.css";

type Props = {
  children: EmbedNode;
};

export async function Embed({
  children: { value },
}: Props): Promise<JSX.Element> {
  const ogp = await fetchOgp(value);

  return (
    <a href={value} className={styles.embedWrapper}>
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
        <img alt="" src={ogp.image} className={styles.embedImage} />
      </article>
    </a>
  );
}
