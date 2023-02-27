import NextImage from "next/image";

import { FAVICON_SIZE, fetchOgp } from "@/lib/ogp";
import type { Embed as EmbedNode } from "@/lib/plugins";

type Props = {
  children: EmbedNode;
};

export async function Embed({
  children: { value },
}: Props): Promise<JSX.Element> {
  const ogp = await fetchOgp(value);

  return (
    <article data-component="true">
      <a href={value}>
        <h2>{ogp.title}</h2>
        <p>{ogp.description}</p>
        {/* SAFETY: `opg.image` is a foreign image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={ogp.image} />
        <footer>
          {/* SAFETY: `opg.image` is a foreign image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogp.favicon ?? ""}
            width={FAVICON_SIZE}
            height={FAVICON_SIZE}
            alt=""
          />
          {ogp.site}
        </footer>
      </a>
    </article>
  );
}
