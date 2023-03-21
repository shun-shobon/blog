import { InternalLink } from "@/components/InternalLink";
import { TITLE } from "@/config";

import styles from "./Header.module.css";
import { HeaderMenu } from "./HeaderMenu";

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <InternalLink href="/" className={styles.logoLink}>
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              width={3072}
              height={512}
              srcSet="/logo-dark.svg"
            />
            <img
              src="/logo-light.svg"
              width={3072}
              height={512}
              alt={TITLE}
              className={styles.logoImg}
            />
          </picture>
        </InternalLink>
        <HeaderMenu />
      </nav>
    </header>
  );
}
