import { useEffect } from 'react';
import { FaBookOpen, FaEye, FaHeart } from 'react-icons/fa6';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Book } from '~/types/book.entity';
import { API_URL } from '~/utils/constants';

type CardBookProps = {
  x: Book;
};

const CardBook = ({ x }: CardBookProps) => {
  //functions
  const getBookLikes = async () => {
    try {
      const req = await fetch(`${API_URL}/book-like?book_key=${x.key}`);

      const res = await req.json();

      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  //effects
  useEffect(() => {}, []);

  return (
    <>
      <Card className='shadow-lg'>
        <CardHeader>
          <img
            src={x.coverImage}
            alt={x.title}
            className='w-full h-50 object-contain'
          />
          <CardTitle>{x.title}</CardTitle>
          <CardDescription>
            <span className='font-semibold text-black'>
              {x.author.split(',').length > 1 ? 'Autores' : 'Autor'}:{' '}
            </span>
            {(() => {
              const autores = x.author
                .split(',')
                .slice(0, 6)
                .map((name) => name.trim());
              return `${autores.slice(0, -1).join(', ')}${
                autores.length > 1 ? ' y ' : ''
              }${autores[autores.length - 1]}`;
            })()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Año de publicación:{' '}
            <span className='font-medium'>{x.firstPublishYear}</span>
          </p>
        </CardContent>
        <CardFooter className='flex gap-2 justify-center items-center'>
          <Button className={`bg-pink-50 rounded-full hover:bg-red-200`}>
            <FaHeart className='text-red-500' />
          </Button>
          {x.bookUrl !== undefined && (
            <a href={x.bookUrl} target='_blank' rel='noopener noreferrer'>
              <Button variant='secondary'>
                <div className='flex items-center gap-2'>
                  <FaBookOpen />
                  Leer
                </div>
              </Button>
            </a>
          )}
          <Button>Recomendar</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardBook;
