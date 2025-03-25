import { FaArrowRightFromBracket, FaBook, FaNewspaper } from "react-icons/fa6";
import type { Route } from "../index/+types";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import BookPage from "./bookPage/BookPage";
import { USER_ID_KEY } from "~/utils/constants";
import NewsPage from "./newsPage/NewsPage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inicio" }];
}
const Home = () => {

  return (
    <main>
      {/* <header className="w-full h-14 bg-green-400 fixed top-0 z-10">
        <nav className="h-full px-4 flex justify-between items-center list-none">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              // className={`${currentPage === 0 && 'bg-accent/80'}`}
              onClick={() => navigate("/home/book")}
            >
              <div className="flex gap-2 items-center">
                <FaBook />
                Libros
              </div>
            </Button>

            <Button
              variant="secondary"
              // className={`${currentPage === 1 && 'bg-accent/80'}`}
              onClick={() => navigate("/home/news")}
            >
              <div className="flex gap-2 items-center">
                <FaNewspaper />
                Noticias
              </div>
            </Button>
          </div>

          <Button variant="outline">
            <div
              className="flex gap-2 items-center"
              onClick={() => {
                localStorage.removeItem(USER_ID_KEY);
                navigate("/");
              }}
            >
              <FaArrowRightFromBracket />
              Cerrar sesion
            </div>
          </Button>
        </nav>
      </header> */}

      {/* {currentPage === 0 && <BookPage books={books} setBooks={setBooks} />} */}
      {/* {currentPage === 1 && <NewsPage news={news} setNews={setNews} />} */}
    </main>
  );
};

export default Home;
