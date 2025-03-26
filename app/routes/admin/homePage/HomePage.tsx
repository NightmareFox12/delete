import { Suspense, lazy, useEffect, useState } from "react";
import AdminLayout from "../_components/AdminLayout";
import { API_URL } from "~/utils/constants";
import { FaSpinner } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "./+types/HomePage";
import { Toaster, toast } from "sonner";

//Lazy components
const LikeBookPieChart = lazy(() => import("./_components/LikeBookPieChart"));
const UserPieChart = lazy(() => import("./_components/UserPieChart"));

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inicio | Administrador" }];
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
      bookLikes: number;
    }[]
  >([]);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  //functions
  const getTotalUsers = async () => {
    try {
      const req = await fetch(`${API_URL}/user/count`);

      const res: { err?: string; unlock: number; block: number } =
        await req.json();

      if (res.err !== undefined) return toast.error(res.err);
      else
        setTotalUsers({
          block: res.block,
          unlock: res.unlock,
        });
    } catch (err) {
      console.log(err);
      toast.error("Ha ocurrido un error con la conexión.");
    }
  };

  const getLikeStats = async () => {
    try {
      const req = await fetch(`${API_URL}/books/like-stats`);

      const res: {
        err?: string;
        likes: { bookTitle: string; bookLikes: number }[];
        totalLikes: number;
      } = await req.json();

      if (res.err !== undefined) return toast.error(res.err);
      else {
        setLikeStats(res.likes);
        setTotalLikes(res.totalLikes);
      }
    } catch (err) {
      console.log(err);
      toast.error("Ha ocurrido un error con la conexión.");
    }
  };

  //effects
  useEffect(() => {
    getTotalUsers();
    getLikeStats();
  }, []);

  return (
    <AdminLayout>
      <Toaster richColors={true} />
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
                  <LikeBookPieChart
                    likeStats={likeStats}
                    totalLikes={totalLikes}
                  />
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
