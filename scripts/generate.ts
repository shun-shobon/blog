import { ARTICLE_DATA_DIR, ARTICLE_IMAGE_DIR, ARTICLES_DIR } from "@/config";
import { exportArticles } from "@/lib/markdown";

async function main() {
  await exportArticles(ARTICLES_DIR, ARTICLE_IMAGE_DIR, ARTICLE_DATA_DIR);
}

void main().catch(console.error);
