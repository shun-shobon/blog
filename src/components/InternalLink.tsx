"use client";

import NextLink from "next/link";
import nProgress from "nprogress";
import type { ComponentProps, MouseEventHandler } from "react";

type Props = ComponentProps<typeof NextLink>;

export function InternalLink({ onClick, ...props }: Props): JSX.Element {
  const onClickWrapped: MouseEventHandler<HTMLAnchorElement> = (event) => {
    nProgress.start();
    onClick?.(event);
  };

  return <NextLink onClick={onClickWrapped} {...props} />;
}
