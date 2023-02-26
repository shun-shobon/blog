import classNames from "classnames";

import styles from "./ArticleEmoji.module.css";

type Props = {
  children: string;
  className?: string | undefined;
};

export function ArticleEmoji({ children, className }: Props): JSX.Element {
  return (
    <span className={classNames(styles.emoji, className)}>{children}</span>
  );
}
