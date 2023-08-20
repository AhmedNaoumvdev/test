import React from "react";
import "./Class.css";
import { BiAddToQueue } from "react-icons/bi";
import Modal from "../components/Modal";
import {
  onSnapshot,
  query,
  collection,
  getFirestore,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider";
import { BsChevronRight } from "react-icons/bs";
import * as XLSX from "xlsx";
const Class = () => {
  const [modalClassIsOpen, setClassIsOpen] = React.useState<boolean>(false);
  const [modalGroupIsOpen, setGroupIsOpen] = React.useState<boolean>(false);
  const [className, setClassName] = React.useState<String>("");
  const [classList, setClassList] = React.useState<String[]>([]);
  const [activeClass, setActiveClass] = React.useState<String | null>("");
  const [GroupName, setGroupName] = React.useState<String>("");
  const [groupList, setGroupList] = React.useState<String[]>([]);
  const [studentData, setStudentData] = React.useState<Student[]>([]);
  const { user } = useAuth();
  const db = getFirestore();
  const handleActiveClass = async (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    e.stopPropagation();
    document.querySelectorAll(".oneClass").forEach((className) => {
      className.classList.remove("activeClass");
    });
    (e.target as Element).classList.add("activeClass");
    console.log((e.target as Element).textContent);
    setActiveClass((e.target as Element).textContent);
    await getDocs(
      collection(
        db,
        "users",
        `${user?.uid}`,
        "classes",
        `${(e.target as Element).textContent}`,
        "groups"
      )
    )
      .then((docs) => {
        const group: String[] = [];
        docs.forEach((doc) => {
          group.push(doc.data().groupName);
          console.log(group);
          console.log("hhhh");
        });
        setGroupList(group);
      })
      .catch((err) => console.error(err));
  };
  const sendClass = async () => {
    await setDoc(doc(db, "users", `${user?.uid}`, "classes", `${className}`), {
      className: className,
    })
      .then(() => {
        console.log("class added");
      })
      .catch((err) => console.error(err));
  };
  interface Student {
    Matricule: string;
    "Nom   ": string;
    Groupe: string;
    Section: string;
    Prénom: string;
    __rowNum__: number;
  }
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsBinaryString(selectedFile);
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.SheetNames;
        const workSheet = workbook.Sheets[sheet[0]]; // Get the first sheet
        const jsonContent: Student[] = XLSX.utils.sheet_to_json(workSheet, {
          range: 1,
        });
        jsonContent.forEach(
          (object: Student, index: number) =>
            (jsonContent[index] = {
              Matricule: object.Matricule,
              "Nom   ": object["Nom   "],
              Groupe: object.Groupe,
              Section: object.Section,
              Prénom: object.Prénom,
              __rowNum__: object.__rowNum__,
            })
        );
        setStudentData(jsonContent);
        console.log(jsonContent);
      };
    }
  };

  const sendGroup = async () => {
    await setDoc(
      doc(
        db,
        "users",
        `${user?.uid}`,
        "classes",
        `${activeClass?.trim()}`,
        "groups",
        `${GroupName}`
      ),
      {
        groupName: GroupName,
      }
    )
      .then(() => {
        console.log("group added");
      })
      .catch((err) => console.error(err));

    studentData.forEach((student: Student) => {
      setDoc(
        doc(
          db,
          "users",
          `${user?.uid}`,
          "classes",
          `${activeClass?.trim()}`,
          "groups",
          `${GroupName}`,
          "students",
          `${student.Matricule.trim()}`
        ),
        {
          fname: student["Nom   "],
          lname: student.Prénom,
          id: student.Matricule.trim(),
          group: student.Groupe,
          section: student.Section,
        }
      )
        .then(() => {
          console.log("student added");
        })
        .catch((err) => console.error(err));
    });
  };
  const getClass = async () => {
    const db = getFirestore();
    const ref = collection(db, "users", `${user?.uid}`, "classes");
    const q = query(ref);
    await getDocs(q)
      .then((docs) => {
        const classe: String[] = [];
        docs.forEach((doc) => {
          classe.push(doc.data().className);
        });
        setClassList(classe);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getClass();
    const ref = collection(db, "users", `${user?.uid}`, "classes");
    const q = query(ref);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const classes: string[] = [];
      querySnapshot.forEach((doc) => {
        classes.push(doc.data().className);
      });
      setClassList(classes);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="sceneContainer">
      <div className="sceneHeader">
        <h1>Class</h1>
        <p>Manage all classes in one place</p>
        <br />
      </div>
      <div className="sceneContents">
        <div className="classes">
          <div className="classesHeader">
            <h3>Class</h3>
            <BiAddToQueue
              onClick={() => setClassIsOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <Modal open={modalClassIsOpen}>
              <h1>Add class</h1>
              <input
                type="text"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
              <button onClick={() => setClassIsOpen(false)}>close</button>
              <button onClick={sendClass}>submit</button>
            </Modal>
          </div>
          {Array.isArray(classList) &&
            classList.map((classItem, index) => (
              <p className="oneClass" onClick={handleActiveClass} key={index}>
                {classItem}
                <BsChevronRight />
              </p>
            ))}
        </div>
        <div className="classes">
          <div className="classesHeader">
            <h3>Group</h3>
            <BiAddToQueue
              onClick={() => setGroupIsOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <Modal open={modalGroupIsOpen}>
              <h1>Add Group</h1>
              <input
                type="text"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <label htmlFor="file">group sheet</label>
              <input
                type="file"
                id="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
              <button onClick={() => setGroupIsOpen(false)}>close</button>
              <button onClick={sendGroup}>submit</button>
            </Modal>
          </div>
          {groupList.map((groupItem, index) => (
            <p className="oneGroup" key={index}>
              {groupItem}
              <BsChevronRight />
            </p>
          ))}
        </div>
        <div className="classes">hhh</div>
      </div>
    </div>
  );
};

export default Class;
