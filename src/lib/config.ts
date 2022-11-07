export type Config = {
  isProduction: boolean;
  articlesPath: string;
};

export function getConfig(): Config {
  const isProduction = process.env.NODE_ENV === "production";
  const articlesPath = isProduction ? "articles" : "test/articles";

  return {
    isProduction,
    articlesPath,
  };
}
