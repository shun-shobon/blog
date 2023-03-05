import styles from "./Footer.module.css";

export function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        Copyright © 2023{" "}
        <address className={styles.address}>
          <a
            href="https://s2n.tech"
            target="_blank"
            rel="noreferer"
            className={styles.addressLink}
          >
            Shuntaro Nishizawa (しゅん🌙)
          </a>
        </address>
      </div>
    </footer>
  );
}
