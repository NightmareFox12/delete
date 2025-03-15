import {
  FaArrowRightFromBracket,
  FaBook,
  FaHouse,
  FaNewspaper,
  FaSpinner,
} from 'react-icons/fa6';
import type { Route } from '../index/+types';
import { Button } from '~/components/ui/button';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { API_URL } from '~/utils/constants';
import BookPage from './bookPage/BookPage';
import { Newspaper } from 'lucide-react';
import type { Book } from '~/types/book.entity';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Inicio' }];
}
const Home = () => {
  const navigate = useNavigate();

  //states
  const [books, setBooks] = useState<Array<Book>>(Array());

  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <main>
      <header className='w-full h-14 bg-green-400'>
        <nav className='h-full px-4 flex justify-between items-center list-none'>
          <div className='flex gap-3'>
            <Button
              variant='secondary'
              className=''
              onClick={() => setCurrentPage(0)}
            >
              <div className='flex gap-2 items-center'>
                <FaBook />
                Libros
              </div>
            </Button>

            <Button
              variant='secondary'
              className=''
              onClick={() => setCurrentPage(1)}
            >
              <div className='flex gap-2 items-center'>
                <FaNewspaper />
                Noticias
              </div>
            </Button>
          </div>

          <Button variant='outline'>
            <div
              className='flex gap-2 items-center'
              onClick={() => navigate('/')}
            >
              <FaArrowRightFromBracket />
              Cerrar sesion
            </div>
          </Button>
        </nav>
      </header>

      {currentPage === 0 && <BookPage books={books} setBooks={setBooks} />}
      {currentPage === 1 && <Newspaper />}
    </main>
  );
};

export default Home;
