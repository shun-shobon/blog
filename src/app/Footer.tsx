import { Twemoji } from "@/components/Twemoji";

import styles from "./Footer.module.css";

export function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <a href="https://notbyai.fyi" target="_blank" rel="noreferrer">
        <picture>
          <source
            srcSet="/images/not-by-ai-dark.svg"
            media="(prefers-color-scheme: dark)"
          />
          <img
            src="/images/not-by-ai-light.svg"
            alt="not by AI"
            height={42}
            width={131}
          />
        </picture>
      </a>
      <div className={styles.googleAnalytics}>
        このサイトでは
        <a
          href="https://policies.google.com/technologies/partner-sites?hl=ja"
          target="_blank"
          rel="noreferrer"
          className={styles.googleAnalyticsLink}
        >
          Google Analytics
        </a>
        を使用しています。
      </div>
      <div className={styles.copyright}>
        Copyright © 2023{" "}
        <address className={styles.address}>
          <a
            href="https://s2n.tech"
            target="_blank"
            rel="noreferrer"
            className={styles.addressLink}
          >
            <Twemoji>Shuntaro Nishizawa (しゅん🌙)</Twemoji>
          </a>
        </address>
      </div>
    </footer>
  );
}
