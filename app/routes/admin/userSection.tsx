import { useEffect, useState } from "react";
import AdminLayout from "./_components/AdminLayout";
import UserTable from "./_components/UserTable/UserTable";
import DialogHandleBlock from "./_components/DialogHandleBlock";
import { API_URL } from "~/utils/constants";
import type { UserEntity } from "~/types/user.entity";

const UserSection = () => {
  //states
  const [showDialog, setShowDialog] = useState<
    { userID: number; block: 0 | 1 } | undefined
  >(undefined);

  const [usersData, setUserData] = useState<UserEntity[]>([]);

  //functions
  const getUsers = async () => {
    try {
      const req = await fetch(`${API_URL}/user`);

      const res: { message?: string; users: UserEntity[] } = await req.json();

      console.log(res);
      if (res.message !== undefined) console.log("lanzar el error");
      else setUserData(res.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {showDialog !== undefined && (
        <DialogHandleBlock
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          getUsers={getUsers}
        />
      )}
      <AdminLayout>
        <section className="p-5 flex-2">
          <div className="flex-1 justify-center items-center">
            <UserTable usersData={usersData} setShowDialog={setShowDialog} />
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default UserSection;
