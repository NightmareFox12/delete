export type News = {
  authors: string[];
  date: string;
  excerpt: string;
  keywords: string[];
  publisher: {
    favicon: string;
    name: string;
    url: string;
  };
  thumbnail: string;
  title: string;
  url: string;
};
