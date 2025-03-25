import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import AdminLayout from "../_components/AdminLayout";
import { API_URL } from "~/utils/constants";
import type { UserEntity } from "~/types/user.entity";
import { FaSpinner } from "react-icons/fa6";
import { AnimatePresence } from "motion/react";
import type { Route } from "../../index/+types";

//lazy components
const UserTable = lazy(() => import("./_components/UserTable/UserTable"));
const DialogHandleBlock = lazy(() => import("./_components/DialogHandleBlock"));
const FormRegister = lazy(() => import("./_components/FormRegister"));

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Usuarios | Administrador' }];
}

const UserPage = () => {
  //states
  const [showDialog, setShowDialog] = useState<
    { userID: number; block: 0 | 1 } | undefined
  >(undefined);

  const [usersData, setUserData] = useState<UserEntity[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  //functions
  const getUsers = async () => {
    try {
      const req = await fetch(`${API_URL}/user`);
      const res: { message?: string; users: UserEntity[] } = await req.json();

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
    {/* Modal block  */}
      <Suspense
        fallback={
          <div className="h-screen w-full flex justify-center items-center">
            <FaSpinner className="animate-spin" size={20} />
          </div>
        }
      >
        <AnimatePresence>
          {showDialog !== undefined && (
            <DialogHandleBlock
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              getUsers={getUsers}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {/* Modal register  */}
      <Suspense
        fallback={
          <div className="h-screen w-full flex justify-center items-center">
            <FaSpinner className="animate-spin" size={20} />
          </div>
        }
      >
        <AnimatePresence>
          {showForm && (
            <FormRegister setShowForm={setShowForm} getUsers={getUsers} />
          )}
        </AnimatePresence>
      </Suspense>
      <AdminLayout>
        <section className="p-5 flex-2">
          <div className="flex-1 justify-center items-center">
            <Suspense
              fallback={
                <div className="h-screen w-full flex justify-center items-center">
                  <FaSpinner className="animate-spin" size={20} />
                </div>
              }
            >
              <UserTable
                usersData={usersData}
                setShowDialog={setShowDialog}
                setShowForm={setShowForm}
              />
            </Suspense>
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default UserPage;
