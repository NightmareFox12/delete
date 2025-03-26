import { Input } from "~/components/ui/input";
import HomeHeader from "../_components/HomeHeader";
import { Button } from "~/components/ui/button";
import { FaMagnifyingGlass, FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import type { Route } from "./+types/SearchBookPage";
import type { BookEntity } from "~/types/book.entity";
import { API_URL } from "~/utils/constants";
import { Toaster, toast } from "sonner";
import CardBook from "../bookPage/_components/CardBook";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Buscar Libros | Educación sustentable" },
    { name: "description", content: "Educación sustentable" },
  ];
}

const SearchPage = () => {
  //states
  const [search, setSearch] = useState<string>("");

  //states
  const [books, setBooks] = useState<Array<BookEntity>>(Array());
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(false);

  //functions
  const handleSearch = async () => {
    try {
      setIsLoadingBook(true);
      const req = await fetch(`${API_URL}/books?title=${search}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      const res: { err?: any; books: Array<BookEntity> } = await req.json();

      if (res.err !== undefined) toast.error(res.err);
      else setBooks(res.books);
    } catch (err) {
      console.log(err);
      toast.error("Error al buscar libros");
    } finally {
      setIsLoadingBook(false);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <Toaster richColors={true} />
      <HomeHeader />

      <section className="w-full h-full flex flex-col gap-2 mt-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mx-auto flex gap-2 sm:w-[500px]"
        >
          <div className="flex-1">
            <Input
              placeholder="Desarrollo humano"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            disabled={isLoadingBook}
          >
            <FaMagnifyingGlass />
          </Button>
        </form>

        {books.length === 0 && !isLoadingBook ? (
            <p className="text-center text-lg font-medium text-gray-500 mt-36">
              No se encontraron libros
            </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-2 lg:mx-5">
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
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchPage;
