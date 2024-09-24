"use client";
import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Button from "../Button/Button";
type Sign = {
  size: string | null;
  type: string | null;
  maxQty: number;
  id: string;
};
const defaultData: Sign[] = [
  {
    size: "9x9",
    type: "Stickers 1",
    maxQty: 5,
    id: "a",
  },
  {
    size: "9x9",
    type: "Stickers 2",
    maxQty: 5,
    id: "b",
  },
  {
    size: "9x9",
    type: "Stickers 3",
    maxQty: 1,
    id: "c",
  },
  {
    size: "9x9",
    type: "Stickers 4",
    maxQty: 1,
    id: "d",
  },
];
const columnHelper = createColumnHelper<Sign>();
function UnassignedItems() {
  const [data, setData] = useState([...defaultData]);
  const [qtyInput, setQtyInput] = useState({});
  const [isDisabledv, setIsDisabled] = useState(false);
  const [isHeadingSize, setIsHeadingSize] = useState(true);
  const [isHeadingType, setIsHeadingType] = useState(true);
  useEffect(() => {
    for (let [key, value] of Object.entries(qtyInput)) {
      if (Number.isNaN(value)) {
        delete qtyInput[key];
      }
    }
    console.log(qtyInput);
  }, [qtyInput]);
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 1500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
      return () => clearTimeout(timeout)
    }, [value])
    return (
      <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
  }
  const handleQtyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    value: number
  ) => {
    parseInt(e.target.value) > value
      ? setKeyValue(id, value)
      : setKeyValue(id, parseInt(e.target.value));
  };
  const toggleHeading = (
    toggleFunc: (value: boolean | ((prevState: boolean) => boolean)) => void,
    toggleValue: boolean
  ) => {
    toggleFunc(!toggleValue);
  };
  const setKeyValue = (key: string, value: number | string) => {
    setQtyInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const columns = [
    columnHelper.accessor("size", {
      header: (props) => (
        <>
          {isHeadingSize ? (
            <span
              onClick={() => toggleHeading(setIsHeadingSize, isHeadingSize)}
            >
              Size
            </span>
          ) : (
            <div>
              <DebouncedInput
                className="w-[35px]"
                onChange={value => props.column.setFilterValue(value)}
                type="text"
                value={(props.column.getFilterValue() ?? '') as string}
              />
              <button
                onClick={() => toggleHeading(setIsHeadingSize, isHeadingSize)}
              >
                x
              </button>
            </div>
          )}
        </>
      ),
      id: "size",
      enableSorting: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("type", {
      header: () => <span>Type</span>,
      id: "type",
      enableSorting: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("maxQty", {
      header: () => <span>Quantity</span>,
      id: "maxQty",
      enableSorting: false,
      enableColumnFilter: false,
      cell: (info) => (
        <>
          <input
            type="number"
            placeholder="0"
            value={qtyInput[info.row.original.id] || ""}
            min="0"
            max={info.getValue()}
            className="qty w-[35px]"
            onChange={(e) =>
              handleQtyInputChange(e, info.row.original.id, info.getValue())
            }
          />
          <span>/{info.getValue()}</span>
        </>
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function isDisabled(): boolean {
    console.log(Object.keys(qtyInput).length);
    return !(Object.keys(qtyInput).length > 0);
  }
  return (
    <div className="border border-solid border-primary-0 p-5">
      <p className="py-3 pl-5 bg-primary-0">Select Items</p>
      <div>
        <div className="max-h-110 overflow-y-scroll">
          <table className="border border-primary-0 border-collapse w-full text-center">
            <thead className="border border-primary-0 bg-[#F4F4F5]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="border border-primary-0"
                      key={header.id}
                    >
                      {
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      }
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="border border-primary-0">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border border-primary-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full text-end">
          <Button
            text="Assign to me"
            variant="secondary"
            styles="mt-6 py-3.5 px-8"
            disabled={isDisabled()}
          />
        </div>
      </div>
    </div>
  );
}
export default UnassignedItems;