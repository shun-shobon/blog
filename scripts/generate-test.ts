import { ARTICLE_DATA_DIR, ARTICLE_IMAGE_DIR } from "@/config";
import { exportArticleDatabase } from "@/lib/exports";

await exportArticleDatabase(
  "test-articles",
  ARTICLE_IMAGE_DIR,
  ARTICLE_DATA_DIR,
);
