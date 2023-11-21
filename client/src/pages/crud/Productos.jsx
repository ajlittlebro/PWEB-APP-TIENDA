import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useProductos } from "../../context/ProductosContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/tablas.css"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
dayjs.extend(utc);
function Productos() {
  const { getProductos, productos, deleteProducto } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  const columns = [
    {
      header: "ID",
      accessorKey: "id_producto",
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
      header: "EDITORA",
      accessorFn: (row) => `${row.id_editora} ${row.nombre_editora}`,
    },
    {
      header: "DESARROLLADOR",
      accessorFn: (row) => `${row.id_desarrollador} ${row.nombre_desarrollador}`,
    },
    {
      header: "PLATAFORMA",
      accessorFn: (row) => `${row.id_plataforma} ${row.nombre_plataforma}`,
    },
    {
      header: "NOMBRE",
      accessorKey: "nombre",
    },
    {
      header: "PRECIO",
      accessorKey: "precio",
    },
    {
      header: "FECHA DE LANZAMIENTO",
      accessorKey: "fecha_lanzamiento",
      cell: (info) => {
        return dayjs(info.getValue()).format("DD/MM/YYYY");
      },
    },
    {
      header: "EXISTENCIA",
      accessorKey: "existencia",
    },
    {
      header: "DESCRIPCIÓN",
      accessorKey: "descripcion",
    },
    /*{
      header: "IMAGEN",
      accessorKey: "imagen",
      cell: (info) => {
        const fullUrl = info.getValue();
        if (fullUrl) {
          const startIndex = fullUrl.indexOf("ImagenesPWEB");
          return startIndex !== -1 ? fullUrl.substring(startIndex) : fullUrl;
        }
        return null;
      },
    }*/,
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
    data: productos,
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
    deleteProducto(id);
  };

  if (productos.length === 0) {
    return (
      <div>
        <h1>No hay productos</h1>
        <Link to={"/crud/productos/crear"}>Crear</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Productos
      </h1>
      <Link to={"/crud/productos/crear"}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Crear</Link>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        class="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
        placeholder="Búsqueda"
      />
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        class="border border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mt-4"
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
                <td key={index}
                className="border p-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="border p-1">
              <Link to={"/crud/productos/" + row.original.id_producto}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded ">Editar</Link>
                <button onClick={() => handleDelete(row.original.id_producto)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">
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

export default Productos;
