export type Config = {
  isProduction: boolean;
  articlePath: string;
};

export const getConfig = (): Config => {
  const isProduction = process.env.NODE_ENV === "production";
  const articlePath = isProduction ? "articles" : "tests/articles";

  return {
    isProduction,
    articlePath,
  };
};
