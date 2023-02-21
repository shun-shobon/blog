import NextLink from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props =
  | ({ internal: true } & ComponentProps<typeof NextLink>)
  | ({ internal?: false } & ComponentProps<"a">);

export function Link({ internal, className, ...props }: Props): JSX.Element {
  const style = twMerge(
    "text-slate-800 transition-colors hover:text-purple-500 dark:text-slate-300 dark:hover:text-purple-400",
    className,
  );

  return internal ? (
    <NextLink
      className={style}
      {...(props as ComponentProps<typeof NextLink>)}
    />
  ) : (
    <a className={style} {...(props as ComponentProps<"a">)} />
  );
}
