import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FaLock } from "react-icons/fa6";
import type { UserEntity } from "~/types/user.entity";

export const UserColumns = (
  setShowDialog: React.Dispatch<
    React.SetStateAction<
      | {
          userID: number;
          block: 0 | 1;
        }
      | undefined
    >
  >
): ColumnDef<UserEntity>[] => [
  {
    accessorKey: "id",
    cell: ({ row }) => <p className="font-semibold">{parseInt(row.id) + 1}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo Electrónico
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const userData = row.original;

      return (
        <Button
          onClick={() =>
            setShowDialog({
              block: userData.block,
              userID: userData.userID,
            })
          }
          className={`${
            userData.block === 1
              ? "bg-green-800 hover:bg-green-900"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <div className="flex items-center justify-center gap-2 ">
            {userData.block === 0 ? (
              <>
                <FaLock />
                Bloquear
              </>
            ) : (
              <>
                <FaLock />
                Desbloquer
              </>
            )}
          </div>
        </Button>
      );
    },
  },
];
