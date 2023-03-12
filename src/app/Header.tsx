import { FaGithub, FaHome } from "react-icons/fa";

import { InternalLink } from "@/components/InternalLink";
import { Link } from "@/components/Link";
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
            <Link href="/" className={styles.navLink}>
              <FaHome />
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/shun-shobon"
              className={styles.navLink}
            >
              <FaGithub />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
