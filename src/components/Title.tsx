import classNames from "classnames";
import type { ComponentProps } from "react";

import styles from "./Title.module.css";

type Props = ComponentProps<"h1">;

export function Title({ children, className, ...props }: Props): JSX.Element {
  return (
    <h1 className={classNames(styles.title, className)} {...props}>
      {children}
    </h1>
  );
}
