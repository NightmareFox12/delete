import { useEffect, useState } from "react";
import { FaBookOpen, FaHeart, FaRegPaperPlane } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { BookEntity } from "~/types/book.entity";
import { API_URL, USER_ID_KEY } from "~/utils/constants";

type CardBookProps = {
  x: BookEntity;
};

const CardBook = ({ x }: CardBookProps) => {
  //states
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  //functions
  const getBookLikes = async () => {
    try {
      const userID = localStorage.getItem(USER_ID_KEY);

      const req = await fetch(
        `${API_URL}/books/like?book_key=${x.key}&userID=${userID}`
      );

      const res = await req.json();

      if (res.message === undefined) {
        setUserLiked(res.userLiked);
        setTotalLikes(res.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const userID = localStorage.getItem(USER_ID_KEY);

      const req = await fetch(`${API_URL}/books/like`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          book_key: x.key,
          book_title: x.title,
          userID,
        }),
      });

      const res = await req.json();
      if (res.success !== undefined) {
        setTotalLikes(userLiked ? totalLikes - 1 : totalLikes + 1);
        setUserLiked(!userLiked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //effects
  useEffect(() => {
    getBookLikes();
  }, []);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <img
            src={x.coverImage}
            alt={x.title}
            className="w-full h-50 object-contain"
          />
          <CardTitle>{x.title}</CardTitle>
          <CardDescription>
            <span className="font-semibold text-black">
              {x.author.split(",").length > 1 ? "Autores" : "Autor"}:{" "}
            </span>
            {(() => {
              const autores = x.author
                .split(",")
                .slice(0, 6)
                .map((name) => name.trim());
              return `${autores.slice(0, -1).join(", ")}${
                autores.length > 1 ? " y " : ""
              }${autores[autores.length - 1]}`;
            })()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Año de publicación:{" "}
            <span className="font-medium">{x.firstPublishYear}</span>
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 justify-center items-center">
          <AnimatePresence>
            {totalLikes > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-[12px] font-semibold"
              >
                {totalLikes}
              </motion.span>
            )}
          </AnimatePresence>

          <Button
            onClick={handleLike}
            className={`${
              userLiked
                ? "bg-red-400 hover:bg-red-300"
                : "bg-pink-50 hover:bg-red-100"
            } rounded-full hover:scale-105 delay-75 transition-all`}
          >
            <FaHeart className={`${userLiked ? "text-white" : "text-black"}`} />
          </Button>
          {x.bookUrl !== undefined && (
            <a href={x.bookUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                <div className="flex items-center gap-2">
                  <FaBookOpen />
                  Leer
                </div>
              </Button>
            </a>
          )}
          {/* <Button variant={'outline'} className='bg-green-100 hover:bg-green-200'>
            <div className='flex items-center gap-2'>
              <FaRegPaperPlane />
              Recomendar
            </div>
          </Button> */}
        </CardFooter>
      </Card>
    </>
  );
};

export default CardBook;
