import { InternalLink } from "@/components/InternalLink";
import { TITLE } from "@/config";

import styles from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.headerList}>
          <li className={styles.headerBrand}>
            <InternalLink href="/" className={styles.headerBrandLink}>
              <img
                src="/logo.svg"
                width={3072}
                height={512}
                alt={TITLE}
                className={styles.headerBrandLogo}
              />
            </InternalLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
