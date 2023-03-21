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
              srcSet="/images/logo-dark.svg"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="/images/logo-light.svg"
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
