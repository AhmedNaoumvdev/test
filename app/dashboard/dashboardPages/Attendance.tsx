import { useEffect, useState } from "react";
import { Student } from "./Students";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "@/context/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DatePickerComponent,
  DatePickerModel,
  DateRange,
} from "@syncfusion/ej2-react-calendars";
import {
  ColumnChooser,
  ColumnDirective,
  ColumnsDirective,
  Edit,
  ExcelExport,
  Grid,
  GridComponent,
  Inject,
  RowDataBoundEventArgs,
  RowSelectEventArgs,
  RowSelectingEventArgs,
  Toolbar,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import { Button } from "@/components/ui/button";

const Attendance = () => {
  const [activeClass, setActiveClass] = useState<string>("");
  const [activegroup, setActiveGroup] = useState<string>("");
  const [classList, setClassList] = useState<string[]>([]);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [dataList, setdataList] = useState<Student[]>([]);
  const [selectedDate, setselectedDate] = useState<string>();
  const [attendDates, setattendDates] = useState<string[]>([]);
  const [selectedRowIndex, setselectedRowIndex] = useState<number[]>([]);
  const [action, setaction] = useState("");
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

  const studentData = async () => {
    if (activegroup)
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
        console.log(dataList);
      });
  };

  useEffect(() => {
    getClass();
  }, []);

  useEffect(() => {
    getGroup();
  }, [activeClass]);

  useEffect(() => {
    const dates: string[] = [];
    if (dataList.length > 0)
      getDocs(
        collection(
          db,
          `users/${user?.uid}/classes/${activeClass}/groups/${activegroup}/students/${dataList[0].id}/attendance`
        )
      )
        .then((snap) => {
          snap.docs.forEach((doc) => {
            dates.push(doc.id);
          });
          setattendDates(dates);
        })
        .catch((err) => console.log(err));
  }, [dataList]);
  const getdate = (arg: any) => {
    const selected: Date | null = arg.value;
    const da = selected
      ?.toLocaleDateString()
      .replace(new RegExp("/", "g"), "-");
    setselectedDate(da);
    console.log(da);
  };
  const editOptions = {
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
    mode: "Batch",
  };
  let grid: Grid | null;
  const toolbar: ToolbarItems[] = [
    "ExcelExport",
    "Update",
    "Cancel",
    "ColumnChooser",
  ];
  const handleCheckboxChange = (args: RowSelectEventArgs) => {
    const el = args.rowIndexes;
    if (el != undefined) setselectedRowIndex(el);
    console.log(el);
  };
  const handleAction = () => {
    if (selectedDate === undefined) return alert("Please select a date");
    setdataList([]);
    switch (action) {
      case "attend":
        studentData();
        if (selectedRowIndex.length > 0) handleSaveAttend();
        setselectedRowIndex([]);
        break;
      case "history":
        break;
      case "part":
        break;

      default:
        break;
    }
  };

  const handleSaveAttend = () => {
    const Students = [...dataList];

    // selectedRowIndex.forEach((rowIndex) => {
    //   if (rowIndex >= 0 && rowIndex < dataList.length) {
    //     Students[rowIndex];
    //     selectedStudentIds.push(selectedStudent); // Assuming the student object has an 'id' property
    //   }
    // });
    Students.forEach((Student, index) => {
      if (selectedRowIndex.includes(index)) {
        console.log("we found a student with attend");
        Student.status = "present";
      } else {
        Student.status = "absent";
      }
    });
    Students.forEach(async (student) => {
      await setDoc(
        doc(
          db,
          "users",
          `${user?.uid}`,
          "classes",
          `${activeClass}`,
          "groups",
          `${activegroup}`,
          "students",
          `${student.id}`,
          "attendance",
          `${selectedDate}`
        ),
        { status: student.status === "present" ? "present" : "absent" },
        { merge: true }
      )
        .then(() => console.log("Successfully seted"))
        .catch((error) => console.log(error));
    });
  };
  const dateCell = async (args: any) => {
    console.log(attendDates);
    console.log(
      args.date.toLocaleDateString().replace(new RegExp("/", "g"), "-")
    );
    if (activeClass && activegroup) {
      if (
        attendDates.some(
          (date) =>
            date ===
            args.date.toLocaleDateString().replace(new RegExp("/", "g"), "-")
        )
      ) {
        args.element.style.backgroundColor = "blue";
        args.element.style.borderRadius = "50%";
      }
    }
  };
  return (
    <div className="sceneContainer max-h-screen overflow-scroll">
      <div className="sceneHeader">
        <h1>Attendance</h1>
        <p>Get attendance records and history</p>
        <br />
      </div>
      <div className=" flex flex-row items-center w-fit">
        <Select
          onValueChange={(v) => {
            setActiveClass(v);
            setActiveGroup("");
            setdataList([]);
          }}
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
        >
          <SelectTrigger className="w-[180px] mr-4">
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
        <Select
          onValueChange={(v) => {
            setaction(v);
            setselectedRowIndex([]);
          }}
          // value={activeClass}
          disabled={activegroup === ""}
        >
          <SelectTrigger className="w-[180px] m-4">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="attend">Attendance</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="part">Participation</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="mr-3"
          disabled={action === ""}
          onClick={handleAction}
        >
          {action === "" && "Go"}
          {action === "attend"
            ? selectedRowIndex.length > 0
              ? "Save Attendance"
              : "Make Attendance"
            : ""}
          {action === "history" && "Get History"}
          {action === "part" && "Make Participation"}
        </Button>
        <DatePickerComponent
          className="w-fit"
          change={getdate}
          format={"M-dd-yyyy"}
          placeholder="Select a date"
          renderDayCell={dateCell}
        ></DatePickerComponent>
      </div>
      <GridComponent
        id="grid"
        editSettings={editOptions}
        toolbar={toolbar}
        allowExcelExport={true}
        showColumnChooser
        ref={(g) => (grid = g)}
        selectionSettings={{ checkboxMode: "Default" }}
        rowSelected={handleCheckboxChange}
        dataSource={dataList}
      >
        <ColumnsDirective>
          <ColumnDirective type="checkbox" />
          <ColumnDirective field="id" headerText="Id" />
          <ColumnDirective field="fname" headerText="First name" />
          <ColumnDirective field="lname" headerText="Last name" />
          <ColumnDirective field="group" headerText="Group" />
        </ColumnsDirective>
        <Inject services={[Edit, Toolbar, ExcelExport, ColumnChooser]} />
      </GridComponent>
    </div>
  );
};

export default Attendance;
