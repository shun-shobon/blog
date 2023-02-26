import classNames from "classnames";
import type { ComponentProps } from "react";

// h1からh6は共通
type Props = ComponentProps<"h1"> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({ level, className, ...props }: Props): JSX.Element {
  const Tag = `h${level}` as const;

  let baseStyle;
  switch (level) {
    case 1:
      baseStyle = "text-4xl font-bold text-purple-700 dark:text-purple-200";
      break;
    case 2:
      baseStyle = "text-3xl font-bold text-purple-700 dark:text-purple-200";
      break;
    case 3:
      baseStyle = "text-2xl font-bold text-purple-700 dark:text-purple-200";
      break;
    case 4:
      baseStyle = "text-xl font-bold text-purple-700 dark:text-purple-200";
      break;
    case 5:
      baseStyle = "text-lg font-bold text-purple-700 dark:text-purple-200";
      break;
    case 6:
      baseStyle = "text-base font-bold text-purple-700 dark:text-purple-200";
      break;
  }

  return <Tag className={classNames(baseStyle, className)} {...props} />;
}
