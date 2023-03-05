import Link from "next/link";

import { TITLE } from "@/config";

import styles from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.headerList}>
          <li className={styles.headerBrand}>
            <Link href="/" className={styles.headerBrandLink}>
              {TITLE}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
