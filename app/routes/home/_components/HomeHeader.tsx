import { FaArrowRightFromBracket, FaBook, FaNewspaper } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { USER_ID_KEY } from "~/utils/constants";

const HomeHeader = () => {
  //navigation
  const navigate = useNavigate();
  const { pathname } = useLocation()

  return (
    <header className="w-full h-14 bg-green-400 fixed top-0 z-10">
      <nav className="h-full px-4 flex justify-between items-center list-none">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className={`${pathname === "/home/book" && 'bg-accent/80'}`}
            onClick={() => navigate("/home/book")}
          >
            <div className="flex gap-2 items-center">
              <FaBook />
              Libros
            </div>
          </Button>

          <Button
            variant="secondary"
            className={`${pathname === "/home/news" && 'bg-accent/80'}`}
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
    </header>
  );
};

export default HomeHeader;
