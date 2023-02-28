import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

const BACKGROUND_IMG = `<svg id="visual" viewBox="0 0 1200 630" width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect width="1200" height="630" fill="#2c363f"></rect><g><g transform="translate(799 10)"><path d="M0 -270.7L234.5 -135.4L234.5 135.4L0 270.7L-234.5 135.4L-234.5 -135.4Z" fill="none" stroke="#58babf" stroke-width="2"></path></g><g transform="translate(140 414)"><path d="M0 -243L210.4 -121.5L210.4 121.5L0 243L-210.4 121.5L-210.4 -121.5Z" fill="none" stroke="#58babf" stroke-width="2"></path></g><g transform="translate(1042 617)"><path d="M0 -248L214.8 -124L214.8 124L0 248L-214.8 124L-214.8 -124Z" stroke="#58babf" fill="none" stroke-width="2"></path></g></g></svg>`;

const ICON_PATH = new URL("../../assets/icon.jpg", import.meta.url);

const GOOGLE_FONT_URL = "https://fonts.googleapis.com/css2";
const NOTO_SANS_JP = "Noto Sans JP:wght@700";

export const config = {
  runtime: "edge",
};

export default async function ogp(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const date = searchParams.get("date");

  const name = "しゅん🌙";

  const notoSansJp = await fetchFont(
    NOTO_SANS_JP,
    `${title ?? ""}${name}${date ?? ""}`,
  );

  const backgroundImage = `url(data:image/svg+xml,${encodeURIComponent(
    BACKGROUND_IMG,
  )})`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          fontFamily: '"NotoSansJP"',
          color: "#e7f5f6",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 48px 64px",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            textAlign: "center",
            flexGrow: "1",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "0px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <img
              src={ICON_PATH.toString()}
              width={64}
              height={64}
              style={{ borderRadius: "50%", marginRight: "16px" }}
              alt=""
            />
            {name}
          </div>

          {date && <div>{date}</div>}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP",
          data: notoSansJp,
          style: "normal",
        },
      ],
    },
  );
}

async function fetchFont(fontName: string, text: string): Promise<ArrayBuffer> {
  const url = new URL(GOOGLE_FONT_URL);
  url.searchParams.set("family", fontName);
  url.searchParams.set("text", text);

  const cssRes = await fetch(url, {
    headers: {
      // ref: https://github.com/vercel/satori/blob/83d658542719c5cf0ea2354e782489f9e1e60a84/playground/pages/api/font.ts#L23C4-L25
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  });
  if (!cssRes.ok) {
    throw new Error(`Failed to fetch font: ${cssRes.statusText}`);
  }
  const css = await cssRes.text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (!resource || !resource[1]) {
    throw new Error("Failed to parse font");
  }

  const fontRes = await fetch(resource[1]);
  if (!fontRes.ok) {
    throw new Error(`Failed to fetch font: ${fontRes.statusText}`);
  }

  return fontRes.arrayBuffer();
}
