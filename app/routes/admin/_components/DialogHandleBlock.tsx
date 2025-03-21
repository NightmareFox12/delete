import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Label } from "recharts";
import { Button } from "~/components/ui/button";
import { DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { API_URL } from "~/utils/constants";

type DialogHandleBlockProps = {
  showDialog: {
    userID: number;
    block: 0 | 1;
  };
  setShowDialog: React.Dispatch<
    React.SetStateAction<
      | {
          userID: number;
          block: 0 | 1;
        }
      | undefined
    >
  >;
  getUsers: () => Promise<void>;
};

const DialogHandleBlock = ({
  showDialog,
  setShowDialog,
  getUsers,
}: DialogHandleBlockProps) => {
  //functions
  const handleBlockUser = async () => {
    try {
      const req = await fetch(`${API_URL}/user/block`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userID: showDialog.userID }),
      });

      const res: { message?: string; success?: boolean } = await req.json();
      if (res.message !== undefined) console.log("klanzar error");
      else {
        await getUsers();
        setShowDialog(undefined);
      }
    } catch (err) {
      console.log(err);
    }
    //aqui blockear, desblouear el usuario, y buscar la forma de actualizar la table
  };

  return (
    <div className="absolute bg-slate-900/40 w-screen h-screen z-50 flex justify-center flex-1 items-center">
      <Dialog open>
        <DialogContent className="sm:max-w-[425px] bg-white p-10 rounded-2xl z-20">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              ¿Esta seguro que desea desbloquear?
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="!justify-center gap-5 mt-5">
            <Button variant="outline" onClick={() => setShowDialog(undefined)}>
              Cancelar
            </Button>
            <Button onClick={handleBlockUser}>
              {showDialog.block === 0 ? "Bloquear" : "Desbloquear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogHandleBlock;
