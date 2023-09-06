"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaGithub, FaHome, FaTags } from "react-icons/fa";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

import { Link } from "@/components/Link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./HeaderMenu.module.css";

export function HeaderMenu(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const matches = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    setShowMenu(!matches);
  }, [matches]);

  return (
    <>
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className={classNames(
          styles.hamburgerButton,
          showMenu && styles.hamburgerButtonClicked,
        )}
        aria-label="メニュー"
      >
        {showMenu ? <RxCross2 /> : <RxHamburgerMenu />}
      </button>
      <ul className={styles.navList} hidden={!showMenu}>
        {headerMenu.map(({ name, href, Icon }) => (
          <li key={href}>
            <Link href={href} className={styles.navLink}>
              <Icon className={styles.navIcon} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const headerMenu = [
  {
    name: "Home",
    href: "/",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Icon: FaHome,
  },
  {
    name: "Tags",
    href: "/tags",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Icon: FaTags,
  },
  {
    name: "GitHub",
    href: "https://github.com/shun-shobon",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Icon: FaGithub,
  },
];
