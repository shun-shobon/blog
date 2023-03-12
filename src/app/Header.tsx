import { FaGithub, FaHome } from "react-icons/fa";

import { InternalLink } from "@/components/InternalLink";
import { TITLE } from "@/config";

import styles from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <InternalLink href="/" className={styles.logoLink}>
          <img
            src="/logo.svg"
            width={3072}
            height={512}
            alt={TITLE}
            className={styles.logoImg}
          />
        </InternalLink>
        <ul className={styles.navList}>
          <li>
            <InternalLink href="/" className={styles.navLink}>
              <FaHome />
            </InternalLink>
          </li>
          <li>
            <a
              href="https://github.com/shun-shobon"
              target="_blank"
              rel="norefferer"
              className={styles.navLink}
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
