import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useDesarrolladores } from "../../context/DesarrolladoresContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/tablas.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
dayjs.extend(utc);
function Desarrolladores() {
  const { getDesarrolladores, desarrolladores, deleteDesarrollador } =
    useDesarrolladores();

  useEffect(() => {
    getDesarrolladores();
  }, []);

  const columns = [
    {
      header: "ID DESARROLLADOR",
      accessorKey: "id_desarrollador",
    },
    {
      header: "NOMBRE",
      accessorKey: "nombre",
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data: desarrolladores,
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

  const handleDelete = (id) => {
    deleteDesarrollador(id);
  };

  if (desarrolladores.length === 0) {
    return (
      <div>
        <h1>No hay desarrolladores</h1>
        <Link to={"/crud/desarrolladores/crear"}>Crear</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Desarrolladores</h1>
      <Link to={"/crud/desarrolladores/crear"}>Crear</Link>
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
              {row.getVisibleCells().map((cell, index) => (
                <td key={index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <Link
                  to={"/crud/desarrolladores/" + row.original.id_desarrollador}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(row.original.id_desarrollador)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        Primer Página
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Página Anterior
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Página Siguiente
      </button>
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        Última Página
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>

      <div className="h-4" />
    </div>
  );
}

export default Desarrolladores;