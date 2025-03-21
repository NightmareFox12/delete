import AdminLayout from "./_components/AdminLayout";
import UserPieChart from "./_components/UserPieChart";
import UserTable from "./_components/UserTable/UserTable";

const HomeSection = () => {
  //TODO: AQUI JALAR LOS DATOS DEL BACK, COMPROBANDO QUE HAYA JWT.
  //TODO: En realidad creo que hay que jalar los usuarios del localStorage
  //TODO: buscar que mas CRUD puedo crear
  return (
    <AdminLayout>
      <section className="p-5">
        <article className="h-screen w-full flex justify-center items-center gap-10">
          <UserPieChart />
        </article>
      </section>
    </AdminLayout>
  );
};

export default HomeSection;
