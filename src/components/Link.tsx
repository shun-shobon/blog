import NextLink from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<typeof NextLink>;

export function Link({ className, ...props }: Props): JSX.Element {
  return (
    <NextLink
      className={twMerge(
        "transition-colors dark:text-slate-300 dark:hover:text-purple-400",
        className,
      )}
      {...props}
    />
  );
}
