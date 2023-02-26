import { exportArticles } from "@/lib/markdown";

void exportArticles("test-articles", "public/articles", "data").catch(
  console.error,
);
