"use client";

import "@/components/ProgressBar.css";

import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useEffect } from "react";

export function ProgressBar(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.configure({ showSpinner: false });
  }, []);

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return null;
}
