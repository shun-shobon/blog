"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import nProgress from "nprogress";
import type { ComponentProps, MouseEventHandler } from "react";

type Props = ComponentProps<typeof NextLink>;

export function InternalLink({ onClick, href, ...props }: Props): JSX.Element {
  const pathname = usePathname();

  const onClickWrapped: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (href !== pathname) {
      nProgress.start();
    }

    onClick?.(event);
  };

  return <NextLink onClick={onClickWrapped} href={href} {...props} />;
}
