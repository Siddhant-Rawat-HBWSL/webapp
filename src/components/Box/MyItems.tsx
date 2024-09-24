"use client";

import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Button from "../Button/Button";

type Sign = {
  item: string;
};

const assigned: Sign[] = [
  {
    item: "Item 1",
  },
  {
    item: "Item 2",
  },
  {
    item: "Item 3",
  },
  {
    item: "Item 4",
  },
  {
    item: "Item 5",
  },
];

const approved: Sign[] = [
  {
    item: "Item 6",
  },
  {
    item: "Item 7",
  },
  {
    item: "Item 8",
  },
  {
    item: "Item 9",
  },
  {
    item: "Item 10",
  },
];

const columnHelper = createColumnHelper<Sign>();

const assignedColumns = [
  columnHelper.accessor("item", {
    header: () => (
      <span className="text-primary-6 text-base font-medium">
        Items assigned to me
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
];

const approvedColumns = [
  columnHelper.accessor("item", {
    header: () => (
      <span className="text-primary-6 text-base font-medium">
        Items approved by me
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
];

function MyItems() {
  const [assignedData, setAssignedData] = useState([...assigned]);
  const [approvedData, setApprovedData] = useState([...approved]);

  const assignedTable = useReactTable({
    data: assignedData,
    columns: assignedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const approvedTable = useReactTable({
    data: approvedData,
    columns: approvedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-solid border-primary-2 p-4">
      <div className="max-h-110 overflow-y-scroll">
        <table className="border border-solid border-primary-2 w-full">
          <thead className="">
            {assignedTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-justify py-3 pl-5 bg-primary-2"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {assignedTable.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border border-solid border-primary-2 w-full text-primary-6 text-sm font-normal"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-3 pl-5"
                    onClick={() => console.log(cell.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full text-end mb-16">
        <Button
          text="Unassign"
          variant="secondary"
          styles="mt-6 py-3.5 px-11 text-sm font-semibold"
        />
      </div>

      <div className="max-h-110 overflow-y-scroll">
        <table className="border border-solid border-primary-2 w-full">
          <thead>
            {approvedTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-justify py-3 pl-5 bg-primary-2"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {approvedTable.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border border-solid border-primary-2 text-primary-6 text-sm font-normal"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className=" py-3 pl-5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyItems;
