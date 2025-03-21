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
    lock: boolean;
  };
  setShowDialog: React.Dispatch<
    React.SetStateAction<
      | {
          userID: number;
          lock: boolean;
        }
      | undefined
    >
  >;
};

const DialogHandleBlock = ({
  showDialog,
  setShowDialog,
}: DialogHandleBlockProps) => {
  //functions
  const handleBlockUser = async () => {
    try {
      const req = await fetch(`${API_URL}/user`);
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
              {showDialog.lock ? "Bloquear" : "Desbloquear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogHandleBlock;
