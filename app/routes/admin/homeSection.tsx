import AdminLayout from "./_components/AdminLayout";
import UserPieChart from "./_components/UserPieChart";

const HomeSection = () => {
  return (
    <AdminLayout>
      <section className="p-5">
        <article className="h-screen w-full flex justify-center items-center gap-10">
          <UserPieChart />
          <UserPieChart />
        </article>
      </section>
    </AdminLayout>
  );
};

export default HomeSection;
