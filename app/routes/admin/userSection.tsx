import { useEffect, useState } from "react";
import AdminLayout from "./_components/AdminLayout";
import UserTable from "./_components/UserTable/UserTable";
import DialogHandleBlock from "./_components/DialogHandleBlock";
import { API_URL } from "~/utils/constants";
import type { UserEntity } from "~/types/user.entity";
import { Button } from "~/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import FormRegister from "./_components/FormRegister";

const UserSection = () => {
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
      {showForm && <FormRegister setShowForm={setShowForm} getUsers={getUsers}/>}
      <AdminLayout>
        <section className="p-5 flex-2">
          <div className="flex-1 justify-center items-center">
            <UserTable usersData={usersData} setShowDialog={setShowDialog} />
          </div>
        </section>
      </AdminLayout>

      <div className="absolute bottom-0 right-0 p-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => setShowForm(true)}
                className="rounded-full h-12 w-12 bg-green-700 hover:bg-green-800"
              >
                <FaPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="bg-slate-100 rounded-2xl p-1 px-2 text-sm">
                Crear Usuario
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default UserSection;
