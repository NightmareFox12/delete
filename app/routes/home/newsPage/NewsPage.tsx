import { useEffect, useState } from 'react';
import { API_URL } from '~/utils/constants';
import NewsCard from './_components/NewsCard';
import { FaSpinner } from 'react-icons/fa6';
import type { NewsEntity } from '~/types/news.entity';

type NewsPageProps = {
  news: Array<NewsEntity>;
  setNews: React.Dispatch<React.SetStateAction<NewsEntity[]>>;
};

const NewsPage = ({ news, setNews }: NewsPageProps) => {
  //states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //functions
  const getNews = async () => {
    try {
      setIsLoading(true);
      const req = await fetch(`${API_URL}/news`);

      const res: { response: { data?: NewsEntity[] } } = await req.json();

      if (res.response.data === undefined) console.log(res.response.data);
      else setNews(res.response.data!!);

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
