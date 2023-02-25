import { exportArticles } from "@/lib/markdown";

void exportArticles("articles", "public/articles", "data").catch(console.error);
