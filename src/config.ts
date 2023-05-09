export const ARTICLES_DIR = "articles";
export const ARTICLE_DATA_DIR = "data";
export const ARTICLE_IMAGE_DIR = "public/articles";
export const ARTICLE_DATABASE_NAME = "articles.json";
export const TITLE = "blog.s2n.tech";
export const ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://blog.s2n.tech/"
    : "http://localhost:3000/";
export const ARTICLE_REPOSITORY_EDIT_PATH = "shun-shobon/articles/blob/master/";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
