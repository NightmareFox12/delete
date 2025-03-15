import { useEffect } from 'react';
import type { News } from '~/types/news.entity';
import { API_URL } from '~/utils/constants';
import NewsCard from './_components/NewsCard';

type NewsPageProps = {
  news: Array<News>;
  setNews: React.Dispatch<React.SetStateAction<News[]>>;
};

const NewsPage = ({ news, setNews }: NewsPageProps) => {
  //functions
  const getNews = async () => {
    try {
      const req = await fetch(`${API_URL}/news`);

      const res: { data: News[] } = await req.json();
      setNews(res.data);

      //TODO: FALTA PONER EL LOADER
    } catch (err) {
      console.log(err);
    }
  };

  //effects
  useEffect(() => {
    console.log('hace lo que sea');
    getNews();
  }, []);

  return (
    <section className='grid md:grid-cols-2 grid-cols-1 gap-3 md:p-4 p-2'>
      {news.map((x, y) => (
        <NewsCard key={y} x={x} />
      ))}
    </section>
  );
};

export default NewsPage;
