import { useEffect, useState } from "react";
import AdminLayout from "./_components/AdminLayout";
import UserPieChart from "./_components/UserPieChart";
import { API_URL } from "~/utils/constants";
import LikeBookPieChart from "./_components/LikeBookPieChart";

const HomeSection = () => {
  //TODO: AQUI JALAR LOS DATOS DEL BACK, COMPROBANDO QUE HAYA JWT.
  //TODO: En realidad creo que hay que jalar los usuarios del localStorage
  //TODO: buscar que mas CRUD puedo crear
  //states
  const [totalUsers, setTotalUsers] = useState<{
    block: number;
    unlock: number;
  }>({ block: 0, unlock: 0 });

  const [likeStats, setLikeStats] = useState<
    {
      bookTitle: string;
      totalLikes: number;
    }[]
  >([]);

  //functions
  const getTotalUsers = async () => {
    try {
      const req = await fetch(`${API_URL}/user/count`);

      const res: { message?: string; unlock: number; block: number } =
        await req.json();

      if (res.message !== undefined) console.log("lanzar error");
      else
        setTotalUsers({
          block: res.block,
          unlock: res.unlock,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getLikeStats = async () => {
    try {
      const req = await fetch(`${API_URL}/books/like-stats`);

      const res: {
        message?: string;
        likes: { bookTitle: string; totalLikes: number }[];
      } = await req.json();

      console.log(res);
      if (res.message !== undefined) console.log("lanzar error");
      else setLikeStats(res.likes);
    } catch (err) {
      console.log(err);
    }
  };

  //effects
  useEffect(() => {
    getTotalUsers();
    getLikeStats();
  }, []);

  return (
    <AdminLayout>
      <section className="p-5">
        <article className="h-screen w-full flex justify-center items-center gap-10">
          <UserPieChart totalUsers={totalUsers} />
          <LikeBookPieChart likeStats={likeStats} />
        </article>
      </section>
    </AdminLayout>
  );
};

export default HomeSection;
