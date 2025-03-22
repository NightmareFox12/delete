import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import type { BookEntity } from "~/types/book.entity";
import { API_URL } from "~/utils/constants";
import CardBook from "./_components/CardBook";
import { toast, Toaster } from "sonner";

type BookPageProps = {
  books: BookEntity[];
  setBooks: React.Dispatch<React.SetStateAction<BookEntity[]>>;
};
const BookPage = ({ books, setBooks }: BookPageProps) => {
  //states
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(false);

  //functions
  const getBooks = async () => {
    try {
      setIsLoadingBook(true);
      const req = await fetch(`${API_URL}/books`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      const res: { err?: any; books: Array<BookEntity> } = await req.json();

      if (res.err !== undefined) toast.error(res.err);
      else setBooks(res.books);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingBook(false);
    }
  };

  useEffect(() => {
    if (books.length > 0) return;
    getBooks();
  }, []);

  return (
    <>
      <Toaster richColors={true} />
      {books.length > 0 && (
        <h2 className="mt-16 text-center text-2xl font-semibold">
          Libros de sostenibilidad
        </h2>
      )}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-2 lg:mx-5">
        {isLoadingBook ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <FaSpinner className="animate-spin scale-200" />
              <p className="font-medium">Cargando Libros...</p>
            </div>
          </div>
        ) : (
          books.map((x, y) => <CardBook key={y} x={x} />)
        )}
      </section>
    </>
  );
};

export default BookPage;
