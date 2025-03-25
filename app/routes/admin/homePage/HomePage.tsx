import { Suspense, lazy, useEffect, useState } from "react";
import AdminLayout from "../_components/AdminLayout";
import { API_URL } from "~/utils/constants";
import { FaSpinner } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "./+types/HomePage";

//Lazy components
const LikeBookPieChart = lazy(() => import("./_components/LikeBookPieChart"));
const UserPieChart = lazy(() => import("./_components/UserPieChart"));

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Inicio | Administrador' }];
}

const HomePage = () => {
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
          {/* Users */}
          <Suspense fallback={<FaSpinner className="animate-spin" size={20} />}>
            <AnimatePresence>
              {totalUsers.block !== 0 ||
                (totalUsers.unlock !== 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <UserPieChart totalUsers={totalUsers} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </Suspense>

          {/* Likes Book */}
          <Suspense fallback={<FaSpinner className="animate-spin" size={20} />}>
            <AnimatePresence>
              {likeStats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LikeBookPieChart likeStats={likeStats} />
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </article>
      </section>
    </AdminLayout>
  );
};

export default HomePage;