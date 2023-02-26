import { expect, test } from "vitest";

import { fetchOgp } from "./ogp";

test.skip("fetchOgp", async () => {
  const url = "https://zenn.dev/topics/react";
  const ogp = await fetchOgp(url);

  expect(ogp.title).toBe("Reactの記事一覧");
  expect(ogp.description).toBeUndefined();
  expect(ogp.image).toBe(
    "https://storage.googleapis.com/zenn-user-upload/topics/489b9436a3.png",
  );
  expect(ogp.site).toBe("Zenn");
  expect(ogp.favicon).toBe(
    "https://www.google.com/s2/favicons?domain_url=https%3A%2F%2Fzenn.dev&sz=64",
  );
});
