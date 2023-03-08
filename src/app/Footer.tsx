import { Twemoji } from "@/components/Twemoji";

import styles from "./Footer.module.css";

export function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.googleAnalytics}>
        このサイトでは
        <a
          href="https://policies.google.com/technologies/partner-sites?hl=ja"
          target="_blank"
          rel="noreferer"
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
            rel="noreferer"
            className={styles.addressLink}
          >
            <Twemoji>Shuntaro Nishizawa (しゅん🌙)</Twemoji>
          </a>
        </address>
      </div>
    </footer>
  );
}
