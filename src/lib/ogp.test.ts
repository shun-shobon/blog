import { expect, test } from "vitest";

import { fetchOgp } from "./ogp";

test("fetchOgp", async () => {
  const url = "https://zenn.dev/topics/react";
  const ogp = await fetchOgp(url);

  expect(ogp.title).toBe("Reactの記事一覧");
  expect(ogp.description).toBeUndefined();
  expect(ogp.image).toBe(
    "https://storage.googleapis.com/zenn-user-upload/topics/489b9436a3.png",
  );
  expect(ogp.isLargeImage).toBeFalsy();
  expect(ogp.site).toBe("Zenn");
  expect(ogp.favicon).toBe("https://zenn.dev/favicon.ico");
});
