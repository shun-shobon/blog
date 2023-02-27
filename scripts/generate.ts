import { ARTICLE_DATA_DIR, ARTICLE_IMAGE_DIR, ARTICLES_DIR } from "@/config";
import { exportArticles } from "@/lib/markdown";

void exportArticles("test-articles", ARTICLE_IMAGE_DIR, ARTICLE_DATA_DIR).catch(
  console.error,
);
