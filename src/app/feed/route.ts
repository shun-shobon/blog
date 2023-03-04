import { generateFeed } from "@/lib/feed";

export async function GET(): Promise<Response> {
  const feed = await generateFeed();
  const atom = feed.atom1();

  return new Response(atom, {
    headers: {
      "content-type": "application/atom+xml; charset=utf-8",
    },
  });
}
