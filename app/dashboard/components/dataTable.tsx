import React, { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "../dashboard/dashboardPages/Students";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../firebase";
import { useAuth } from "@/context/AuthProvider";
import { Toggle } from "@/components/ui/toggle";

const DataTable = ({ columns }: any) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [activeClass, setActiveClass] = useState<string>("");
  const [activegroup, setActiveGroup] = useState<string>("");
  const [classList, setClassList] = useState<string[]>([]);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [dataList, setdataList] = useState<Student[]>([]);
  const [originalData, setOriginalData] = useState(() => [...dataList]);
  const [editedRows, setEditedRows] = useState({});
  const { user } = useAuth();

  const getClass = async () => {
    await getDocs(collection(db, "users", `${user?.uid}`, "classes"))
      .then((docs) => {
        const classe: string[] = [];
        docs.forEach((doc) => {
          classe.push(doc.data().className);
        });
        setClassList(classe);
        console.log(classe);
      })
      .catch((err) => console.log(err));
  };

  const getGroup = async () => {
    await getDocs(
      collection(
        db,
        "users",
        `${user?.uid}`,
        "classes",
        `${activeClass}`,
        "groups"
      )
    )
      .then((docs) => {
        const group: string[] = [];
        docs.forEach((doc) => {
          group.push(doc.data().groupName);
          console.log(group);
        });
        console.log(activeClass, group);
        setGroupList(group);
      })
      .catch((err) => console.error(err));
  };

  const studentData = async () =>
    await getDocs(
      collection(
        db,
        "users",
        `${user?.uid}`,
        "classes",
        `${activeClass}`,
        "groups",
        `${activegroup}`,
        "students"
      )
    ).then((snapShot) => {
      const perdata: Student[] = [];
      snapShot.forEach((snapShot) => {
        perdata.push({
          fname: snapShot.data().fname,
          group: snapShot.data().group,
          id: snapShot.data().id,
          lname: snapShot.data().lname,
          section: snapShot.data().section,
        });
      });
      setdataList(perdata);
    });

  const table = useReactTable({
    data: dataList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setdataList((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) =>
              index === rowIndex ? dataList[rowIndex] : row
            )
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setdataList((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  useEffect(() => {
    getClass();
  }, []);

  useEffect(() => {
    getGroup();
  }, [activeClass]);

  useEffect(() => {
    studentData();
  }, [activegroup]);

  return (
    <div className="w-full p-10">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          onValueChange={(v) => {
            setActiveClass(v);
          }}
          value={activeClass}
        >
          <SelectTrigger className="w-[180px] m-4">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {classList &&
              classList.map((classa, index) => (
                <SelectItem key={index} value={classa}>
                  {classa}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(v) => {
            setActiveGroup(v);
          }}
          value={activegroup}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            {groupList &&
              groupList.map((group, index) => (
                <SelectItem key={index} value={group}>
                  {group}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Toggle onClick={() => console.log("clicked")}>Edit</Toggle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              View options <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
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
          {/* <div>
            <button onClick={() => rerender()}>Force Rerender</button>
          </div>
          <div>
            <button onClick={() => refreshData()}>Refresh Data</button>
          </div> */}
        </div>
      </div>
      <pre>{JSON.stringify(dataList, null, "\t")}</pre>
    </div>
  );
};

export default DataTable;
