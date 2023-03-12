import { ARTICLE_DATA_DIR, ARTICLE_IMAGE_DIR } from "@/config";
import { exportArticleDatabase } from "@/lib/exports";

void exportArticleDatabase(
  "test-articles",
  ARTICLE_IMAGE_DIR,
  ARTICLE_DATA_DIR,
).catch(console.error);
