import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

const BACKGROUND_IMG = `<svg id="visual" viewBox="0 0 1200 630" width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect width="1200" height="630" fill="#2c363f"></rect><g><g transform="translate(799 10)"><path d="M0 -270.7L234.5 -135.4L234.5 135.4L0 270.7L-234.5 135.4L-234.5 -135.4Z" fill="none" stroke="#58babf" stroke-width="2"></path></g><g transform="translate(140 414)"><path d="M0 -243L210.4 -121.5L210.4 121.5L0 243L-210.4 121.5L-210.4 -121.5Z" fill="none" stroke="#58babf" stroke-width="2"></path></g><g transform="translate(1042 617)"><path d="M0 -248L214.8 -124L214.8 124L0 248L-214.8 124L-214.8 -124Z" stroke="#58babf" fill="none" stroke-width="2"></path></g></g></svg>`;

const NOTO_SANS_JP_PATH = new URL(
  "../../assets/NotoSansJP-Bold.otf",
  import.meta.url,
);

const ICON_PATH = new URL("../../assets/icon.jpg", import.meta.url);

export const config = {
  runtime: "edge",
};

export default async function ogp(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const date = searchParams.get("date");

  const assets = await fetchAssets();

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
            しゅん🌙
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
          data: assets.notoSansJp,
          style: "normal",
        },
      ],
    },
  );
}

type Assets = {
  notoSansJp: ArrayBuffer;
};

async function fetchAssets(): Promise<Assets> {
  const notoSansJp = await fetch(NOTO_SANS_JP_PATH).then((res) =>
    res.arrayBuffer(),
  );

  return { notoSansJp };
}
