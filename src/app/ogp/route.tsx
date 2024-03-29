import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

import { BACKGROUND_IMG, TITLE_IMG } from "@/assets/assets";

const ICON_PATH = new URL("../../assets/icon.jpg", import.meta.url);

const GOOGLE_FONT_URL = "https://fonts.googleapis.com/css2";
const M_PLUS_1P = "M PLUS Rounded 1c:wght@500";

export async function GET(req: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const tags = searchParams.get("tags")?.split(",") ?? [];
  const emoji = searchParams.get("emoji");

  const name = "しゅん🌙";

  const mPlus1p = await fetchFont(
    M_PLUS_1P,
    `${title ?? ""}${name}${tags.join("")}`,
  );

  const backgroundImage = `url(data:image/svg+xml,${encodeURIComponent(
    BACKGROUND_IMG,
  )})`;

  const titleImage = `data:image/svg+xml,${encodeURIComponent(TITLE_IMG)}`;

  const iconImage = await fetch(ICON_PATH).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 36,
          backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          fontFamily: '"M PLUS Rounded 1c"',
          color: "#e7f5f6",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 48px 56px",
          // rowGap: "16px",
        }}
      >
        {title != null ? (
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              textAlign: "center",
              flexGrow: "1",
              lineHeight: 1,
              rowGap: "8px",
            }}
          >
            {emoji != null && (
              <span
                style={{
                  fontSize: 96,
                  marginTop: "-24px",
                }}
              >
                {emoji}
              </span>
            )}
            <span>{title}</span>
          </h2>
        ) : (
          <h2
            style={{
              display: "flex",
              flexGrow: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={titleImage}
              style={{ aspectRatio: "6 / 1" }}
              height={128}
              alt=""
            />
          </h2>
        )}
        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "24px",
              fontSize: 32,
              marginTop: "-24px",
              marginBottom: "24px",
            }}
          >
            {tags.map((tag, idx) => {
              return <span key={idx}>#{tag}</span>;
            })}
          </div>
        )}
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
              // @ts-expect-error: This is a valid type
              src={iconImage}
              width={64}
              height={64}
              style={{ borderRadius: "50%", marginRight: "16px" }}
              alt=""
            />
            {name}
          </div>

          {title != null && (
            <img
              src={titleImage}
              style={{ aspectRatio: "6 / 1" }}
              height={64}
              alt=""
            />
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "M PLUS Rounded 1c",
          data: mPlus1p,
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
    /src: url\((?<fontUrl>.+)\) format\('(?:opentype|truetype)'\)/u,
  );

  const fontUrl = resource?.groups?.fontUrl;

  if (fontUrl == null) {
    throw new Error("Failed to parse font");
  }

  const fontRes = await fetch(fontUrl);
  if (!fontRes.ok) {
    throw new Error(`Failed to fetch font: ${fontRes.statusText}`);
  }

  return fontRes.arrayBuffer();
}
