import AdminLayout from "./_components/AdminLayout";
import LikeBookTable from "./_components/LikeBookTable/LikeBookTable";
import type { LikeBookEntity } from "~/types/likeBook.entity";
import { useEffect, useState } from "react";
import { API_URL } from "~/utils/constants";

const LikeBookSection = () => {
  //states
  const [likeBookData, setLikeBookData] = useState<LikeBookEntity[]>([]);

  //functions
  const getLikeBooks = async () => {
    try {
      const req = await fetch(`${API_URL}/books/like-all`);

      const res: { message?: string; likes: LikeBookEntity[] } = await req.json();

      if (res.message !== undefined) console.log("lanzar el error");
      else setLikeBookData(res.likes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikeBooks();
  }, []);

  return (
    <AdminLayout>
      <section className="p-5 flex-2">
        <div className="flex-1 justify-center items-center">
          <LikeBookTable likeBookData={likeBookData} />
        </div>
      </section>
    </AdminLayout>
  );
};

export default LikeBookSection;
