import { useEffect, useState } from 'react';
import type { News } from '~/types/news.entity';
import { API_URL } from '~/utils/constants';
import NewsCard from './_components/NewsCard';
import { FaSpinner } from 'react-icons/fa6';

type NewsPageProps = {
  news: Array<News>;
  setNews: React.Dispatch<React.SetStateAction<News[]>>;
};

const NewsPage = ({ news, setNews }: NewsPageProps) => {
  //states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //functions
  const getNews = async () => {
    try {
      setIsLoading(true);
      const req = await fetch(`${API_URL}/news`);

      const res: { data?: News[]; err?: any } = await req.json();

      if (res.err !== undefined) console.log(res.err);
      else setNews(res.data!!);

      //TODO: FALTA PONER EL LOADER
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  //effects
  useEffect(() => {
    getNews();
  }, []);

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:p-4 p-2 mt-15'>
      {isLoading ? (
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className='flex flex-col items-center gap-4'>
            <FaSpinner className='animate-spin scale-200' />
            <p className='font-medium'>Cargando Noticias...</p>
          </div>
        </div>
      ) : (
        news.map((x, y) => <NewsCard key={y} x={x} />)
      )}
    </section>
  );
};

export default NewsPage;
