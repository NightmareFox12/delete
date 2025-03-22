import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FaLock } from "react-icons/fa6";
import type { LikeBookEntity } from "~/types/likeBook.entity";

export const LikeBookColumns = (
  // setShowDialog: React.Dispatch<
  //   React.SetStateAction<
  //     | {
  //         userID: number;
  //         block: 0 | 1;
  //       }
  //     | undefined
  //   >
  // >
): ColumnDef<LikeBookEntity>[] => [
  {
    id: "likeBookID",
    cell: ({ row }) => <p className="font-semibold">{parseInt(row.id) + 1}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userID",
    header: "Usuario ID",
    cell: ({ row }) => <div className="capitalize">{row.original.userID}</div>,
  },
  {
    accessorKey: "bookKey",
    header: ({ column }) => {
      return (
        <p>Libro ID</p>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Apellido
        //   <ArrowUpDown />
        // </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.bookKey}</div>,
  },
  {
    accessorKey: "date",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <p>Fecha</p>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Correo Electrónico
        //   <ArrowUpDown />
        // </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {
          // row.getValue("correo")
          row.original.date
        }
      </div>
    ),
  },
];
