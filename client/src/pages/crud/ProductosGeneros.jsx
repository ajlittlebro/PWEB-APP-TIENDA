import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useProductosGeneros } from "../../context/ProductosGenerosContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/tablas.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
dayjs.extend(utc);
function ProductosGeneros() {
  const { getProductosGeneros, productosGeneros, deleteProductoGenero } =
    useProductosGeneros();

  useEffect(() => {
    getProductosGeneros();
  }, []);

  const columns = [
    {
      header: "ID PRODUCTO",
      accessorKey: "id_producto",
    },
    {
      header: "PRODUCTO",
      accessorKey: "nombre_producto",
    },
    {
      header: "ID GENERO",
      accessorKey: "id_genero",
    },
    {
      header: "GENERO",
      accessorKey: "nombre_genero",
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
    data: productosGeneros,
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

  const handleDelete = (idproducto, idgenero) => {
    deleteProductoGenero(idproducto, idgenero);
  };

  if (productosGeneros.length === 0) {
    return (
      <div>
        <h1>No hay contenido.</h1>
        <Link to={"/crud/productosgeneros/crear"}>Crear</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Géneros de Productos</h1>
      <Link to={"/crud/productosgeneros/crear"}>Crear</Link>
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
                <button
                  onClick={() =>
                    handleDelete(
                      row.original.id_producto,
                      row.original.id_genero
                    )
                  }
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

export default ProductosGeneros;