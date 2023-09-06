import { ARTICLE_DATA_DIR, ARTICLE_IMAGE_DIR, ARTICLES_DIR } from "@/config";
import { exportArticleDatabase } from "@/lib/exports";

await exportArticleDatabase(
  ARTICLES_DIR,
  ARTICLE_IMAGE_DIR,
  ARTICLE_DATA_DIR,
);
