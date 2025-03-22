import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FaLock, FaSquareArrowUpRight } from "react-icons/fa6";
import type { LikeBookEntity } from "~/types/likeBook.entity";

export const LikeBookColumns = (): // setShowDialog: React.Dispatch<
//   React.SetStateAction<
//     | {
//         userID: number;
//         block: 0 | 1;
//       }
//     | undefined
//   >
// >
ColumnDef<LikeBookEntity>[] => [
  {
    id: "likeBookID",
    cell: ({ row }) => <p className="font-semibold">{parseInt(row.id) + 1}</p>,
  },
  {
    accessorKey: "userName",
    enableSorting: true,
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userName")}</div>
    ),
  },
  {
    id: "bookKey",
    accessorKey: "bookKey",
    header: "Libro",
    cell: ({ row }) => (
      <a
        href={`https://openlibrary.org${row.getValue("bookKey")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="bg-green-700 hover:bg-green-800 ">
          <div className="flex items-center gap-2">
            Ver Libro
            <FaSquareArrowUpRight />
          </div>
        </Button>
      </a>
    ),
  },
  {
    accessorKey: "bookTitle",
    enableSorting: true,
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titulo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bookTitle")}</div>
    ),
  },
  {
    accessorKey: "date",
    enableColumnFilter: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="lowercase">
        {(row.getValue("date") as string)
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/")}
      </span>
    ),
  },
];
