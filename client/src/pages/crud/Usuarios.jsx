import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useUsuarios } from "../../context/UsuariosContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/tablas.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
dayjs.extend(utc);
function Usuarios() {
  const { getUsuarios, usuarios, deleteUsuario } = useUsuarios();

  useEffect(() => {
    getUsuarios();
  }, []);

  const columns = [
    {
      header: "ID USUARIO",
      accessorKey: "id_usuario",
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
      header: "ROL",
      accessorFn: (row) => `${row.id_rol} ${row.rol}`,
    },
    {
      header: "NOMBRE",
      accessorKey: "nombre",
    },
    {
      header: "CORREO",
      accessorKey: "correo",
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
    data: usuarios,
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
    deleteUsuario(id);
  };

  if (usuarios.length === 0) {
    return (
      <div>
        <h1>No hay usuarios</h1>
        <Link to={"/crud/usuarios/crear"}>Crear</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Usuarios</h1>
      <Link
        to={"/crud/usuarios/crear"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Crear
      </Link>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Búsqueda"
        className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
      />
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="border border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mt-4"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {" "}
            Mostrar {pageSize}{" "}
          </option>
        ))}
      </select>
      <span className=" items-center  p-2 rounded">
        {" "}
        | Ir a la página:{" "}
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border border-gray-400 p-1 rounded w-16"
        />{" "}
      </span>{" "}
      <table className="w-full p-1 table-auto border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="border p-1"
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
                <td key={index} className="border p-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="border p-1">
                <Link
                  to={"/crud/usuarios/" + row.original.id_usuario}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(row.original.id_usuario)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded"
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Primer Página{" "}
      </button>{" "}
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Página Anterior{" "}
      </button>{" "}
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Página Siguiente{" "}
      </button>{" "}
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Última Página{" "}
      </button>{" "}
      <span className="flex items-center gap-1">
        {" "}
        <div>Página </div>{" "}
        <strong>
          {" "}
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}{" "}
        </strong>{" "}
      </span>{" "}
      <div className="h-4" />
    </div>
  );
}

export default Usuarios;
