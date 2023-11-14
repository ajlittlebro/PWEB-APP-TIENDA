import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useNoticias } from "../context/noticiasContext";
import { useEffect, useState } from "react";
import "../css/Tablas.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
function Tablas() {
  const { getNoticias, noticias } = useNoticias();

  useEffect(() => {
    getNoticias();
  }, []);

  const columns = [
    {
      header: "ID NOTICIA",
      accessorKey: "id_noticia",
    },
    /*{
      header: "ID USUARIO",
      accessorKey: "id_usuario",
    },
    {
      header: "USUARIO",
      accessorKey: "nombre_usuario",
    },*/
    {
      header: "USUARIO",
      accessorFn: (row) => `${row.id_usuario} ${row.nombre_usuario}`,
    },
    {
      header: "TITULO",
      accessorKey: "titulo",
    },
    {
      header: "DESCRIPCION",
      accessorKey: "descripcion",
    },
    {
      header: "FECHA",
      accessorKey: "fecha",
      cell: (info) => {
        return dayjs(info.getValue()).format("DD/MM/YYYY");
      },
    },
    {
      header: "IMAGEN",
      accessorKey: "imagen",
      cell: (info) => {
        const fullUrl = info.getValue();
        const startIndex = fullUrl.indexOf("ImagenesPWEB");
        return startIndex !== -1 ? fullUrl.substring(startIndex) : fullUrl;
      },
    },
    {
      header: "CREADO",
      accessorKey: "creadaEn",
      cell: (info) => {
        return dayjs(info.getValue()).format("MMM D, YYYY h:mm A");
      },
    },
    {
      header: "ACTUALIZADO",
      accessorKey: "actualizadoEn",
      cell: (info) => {
        return dayjs(info.getValue()).format("MMM D, YYYY h:mm A");
      },
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data: noticias,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  if (noticias.length === 0) return <h1>No hay noticias</h1>;

  return (
    <div>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { asc: "⬆️", desc: "⬇️" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => table.setPageIndex(table.getPageCount(0))}>
        Primer Página
      </button>
      <button onClick={() => table.previousPage()}>Página Anterior</button>
      <button onClick={() => table.nextPage()}>Página Siguiente</button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Última Página
      </button>
    </div>
  );
}

export default Tablas;
