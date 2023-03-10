import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { bufferToHex } from "./lib/utils";

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

export function middleware(req: NextRequest): NextResponse | void {
  const nonce = generateNonce();
  const csp = generateCspHeader(nonce);

  const headers = new Headers(req.headers);

  headers.set("Content-Security-Policy", csp);
  headers.set("X-CSP-Nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

// https://w3c.github.io/webappsec-csp/#security-nonces
const NONCE_BIT_LENGTH = 128;

function generateNonce(): string {
  return bufferToHex(
    crypto.getRandomValues(new Uint8Array(NONCE_BIT_LENGTH / 8)),
  );
}

function generateCspHeader(nonce: string): string {
  const scriptSrc = [
    "'self'",
    process.env.NODE_ENV === "development" && "'unsafe-eval'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    "https://platform.twitter.com",
  ]
    .filter(Boolean)
    .join(" ");

  const csp = [
    "default-src 'self'",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-src 'self' https://www.googletagmanager.com https://platform.twitter.com",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src * data:",
    "img-src * data:",
  ].join("; ");

  return csp;
}
