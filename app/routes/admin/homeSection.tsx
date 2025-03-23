import { lazy, useEffect, useState } from "react";
import AdminLayout from "./_components/AdminLayout";
import { API_URL } from "~/utils/constants";
import { FaSpinner } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";

//Lazy components
const LikeBookPieChart = lazy(() => import("./_components/LikeBookPieChart"));
const UserPieChart = lazy(() => import("./_components/UserPieChart"));

const HomeSection = () => {
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

  const [userLoading, setUserLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  //functions
  const getTotalUsers = async () => {
    try {
      setUserLoading(true);
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
    } finally {
      setUserLoading(false);
    }
  };

  const getLikeStats = async () => {
    try {
      setLikeLoading(true);
      const req = await fetch(`${API_URL}/books/like-stats`);

      const res: {
        message?: string;
        likes: { bookTitle: string; totalLikes: number }[];
      } = await req.json();

      if (res.message !== undefined) console.log("lanzar error");
      else setLikeStats(res.likes);
    } catch (err) {
      console.log(err);
    } finally {
      setLikeLoading(false);
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
          <AnimatePresence>
            {userLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaSpinner className="animate-spin" size={20} />
              </motion.span>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UserPieChart totalUsers={totalUsers} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Likes Book */}
          <AnimatePresence>
            {likeLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaSpinner className="animate-spin" size={20} />
              </motion.span>
            ) : (
              likeStats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LikeBookPieChart likeStats={likeStats} />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </article>
      </section>
    </AdminLayout>
  );
};

export default HomeSection;
