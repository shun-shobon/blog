import Link from "next/link";

import styles from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <ul className={styles.headerList}>
        <li className={styles.headerBrand}>
          <Link href="/" className={styles.headerBrandLink}>
            星朧の夜
          </Link>
        </li>
        <li>
          <Link className={styles.headerLink} href="/">
            HOME
          </Link>
        </li>
      </ul>
    </header>
  );
}
