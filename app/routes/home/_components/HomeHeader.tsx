import { FaArrowRightFromBracket, FaBook, FaMagnifyingGlass, FaNewspaper } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { USER_ID_KEY } from "~/utils/constants";

const HomeHeader = () => {
  //navigation
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="w-full h-14 bg-green-700 fixed top-0 z-10">
      <nav className="h-full px-4 flex justify-between items-center list-none">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className={`${pathname === "/home/book" && "bg-green-600"} text-white hover:bg-green-600 hover:text-white`}
            onClick={() => navigate("/home/book")}
          >
            <div className="flex gap-2 items-center">
              <FaBook />
              Libros
            </div>
          </Button>

          <Button
            variant="ghost"
            className={`${pathname === "/home/search-book" && "bg-green-600"} text-white hover:bg-green-600 hover:text-white`}
            onClick={() => navigate("/home/search-book")}
          >
            <div className="flex gap-2 items-center">
              <FaMagnifyingGlass />
              Buscar Libros
            </div>
          </Button>

          <Button
            variant="ghost"
            className={`${pathname === "/home/news" && "bg-green-600"} text-white hover:bg-green-600 hover:text-white`}
            onClick={() => navigate("/home/news")}
          >
            <div className="flex gap-2 items-center">
              <FaNewspaper />
              Noticias
            </div>
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          {/* <Button variant="ghost" className="text-white hover:bg-green-600 hover:text-white">
            <div
              className="flex gap-2 items-center"
              onClick={() => {
                localStorage.removeItem(USER_ID_KEY);
                navigate("/");
              }}
            >
              <FaSearchengin />
            </div>
          </Button> */}

          <Button variant="ghost" className="text-white hover:bg-green-600 hover:text-white">
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
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
