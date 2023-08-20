import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthProvider";
import {
  ColumnChooser,
  ColumnDirective,
  ColumnsDirective,
  DataSourceChangedEventArgs,
  Edit,
  EditSettingsModel,
  ExcelExport,
  Filter,
  Grid,
  GridComponent,
  Inject,
  Page,
  Search,
  Toolbar,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import { db } from "../../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-notifications/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
declare global {
  interface HTMLElement {
    ej2_instances: any[]; // You might want to replace 'any[]' with a more accurate type if possible
  }
}
export interface Student {
  fname: string;
  group: string;
  id: string;
  lname: string;
  section: string;
  TD?: number;
  TP?: number;
  Exam?: number;
  Test?: number;
  status?: string;
}

export default function Students() {
  const [activeClass, setActiveClass] = useState<string>("");
  const [activegroup, setActiveGroup] = useState<string>("");
  const [classList, setClassList] = useState<string[]>([]);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [dataList, setdataList] = useState<Student[]>([]);
  const [updateDataList, setupdateDataList] = useState<Student[]>([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnInitialValue, setNewColumnInitialValue] = useState("");

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
    if (activeClass)
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

  useEffect(() => {
    getClass();
  }, []);

  useEffect(() => {
    getGroup();
  }, [activeClass]);

  useEffect(() => {
    studentData();
  }, [activegroup]);
  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };
  let grid: Grid | null;
  const pageSettings = { pageSize: 10 };
  const toolbar: ToolbarItems[] = [
    "ExcelExport",
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "Search",
    "ColumnChooser",
  ];
  const toolbarClick = (args: ClickEventArgs) => {
    if (grid && args.item.id === "grid_excelexport") {
      grid.excelExport();
    }
  };
  const updateData = (args: DataSourceChangedEventArgs) => {
    var grid = (document.getElementById("grid") as HTMLElement)
      .ej2_instances[0];
    const changedData = grid.getBatchChanges().changedRecords;
    const updatedData = [...dataList];
    const changedDataList = [];
    for (const record of changedData) {
      const index = updatedData.findIndex((item) => item.id === record.id);
      if (index !== -1) {
        updatedData[index] = record as Student;
        changedDataList.push(record);
      }
    }
    console.log(changedDataList);
    setupdateDataList(changedDataList);
    setdataList(updatedData);
    saveData();
  };

  const saveData = () => {
    for (const updatedRecord of updateDataList) {
      const docRef = doc(
        db,
        "users",
        `${user?.uid}`,
        "classes",
        `${activeClass}`,
        "groups",
        `${activegroup}`,
        "students",
        `${updatedRecord.id}`
      );
      updateDoc(docRef, updatedRecord as any)
        .then(() => {
          console.log("Updated");
        })
        .catch((err) => console.error(err));
    }
  };
  const addNewColumn = () => {
    if (newColumnName) {
      // Add new column to ColumnsDirective
      const newColumns = [
        ...(grid?.columns as ColumnDirective[]),
        { field: newColumnName, headerText: newColumnName },
      ];
      // grid.columns = newColumns;
      console.log(newColumns);
      // Update dataList with new column's initial values
      const updatedData = dataList.map((item) => ({
        ...item,
        [newColumnName]: newColumnInitialValue || "Default Value",
      }));
      setdataList(updatedData);

      // Reset input fields
      setNewColumnName("");
      setNewColumnInitialValue("");
    }
  };

  return (
    <div className="sceneContainer max-h-screen overflow-scroll">
      <div className="sceneHeader">
        <h1>Student</h1>
        <br />
      </div>
      <div className=" flex flex-row items-center">
        <Select
          onValueChange={(v) => {
            setActiveClass(v);
            setActiveGroup("");
            setdataList([]);
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
      </div>
      <GridComponent
        dataSource={dataList}
        id="grid"
        editSettings={editOptions}
        toolbar={toolbar}
        toolbarClick={toolbarClick}
        allowExcelExport={true}
        allowPaging={true}
        pageSettings={pageSettings}
        beforeBatchSave={updateData}
        showColumnChooser
        allowFiltering={true}
        filterSettings={{ type: "Menu" }}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="Id" allowFiltering={false} />
          <ColumnDirective field="fname" headerText="First Name" />
          <ColumnDirective field="lname" headerText="Last Name" />
        </ColumnsDirective>
        <Inject
          services={[
            Edit,
            Toolbar,
            ExcelExport,
            Page,
            Filter,
            ColumnChooser,
            Search,
          ]}
        />
      </GridComponent>
    </div>
  );
}
