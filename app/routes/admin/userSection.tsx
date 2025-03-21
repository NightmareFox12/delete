import AdminLayout from "./_components/AdminLayout";
import UserPieChart from "./_components/UserPieChart";

const UserSection = () => {
  return (
    <AdminLayout>
      <section className="p-5">
        <UserPieChart />
      </section>
    </AdminLayout>
  );
};

export default UserSection;
