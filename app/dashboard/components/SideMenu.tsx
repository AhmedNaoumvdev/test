import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Logo from "../../landing/components/Logo";
import { BiSolidDashboard } from "react-icons/bi";
import { BiBookOpen } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { BiHelpCircle } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { auth } from "../../../firebase";
import ProfileBadge from "./ProfileBadge";
import Link from "next/link";

const SideMenu = () => {
  const [toggled, setToggled] = useState(false);
  const iconSize = 28;
  const signout = () => {
    auth
      .signOut()
      .then(() => {
        // navigate("/", { replace: true });
        console.log("Sign out");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Sidebar
      collapsed={toggled}
      collapsedWidth="75px"
      backgroundColor="var(--background)"
      rootStyles={{ height: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "10px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: toggled ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            marginTop: 15,
            marginBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Logo toggled={toggled} />
          <BsChevronLeft
            style={{
              transform: toggled ? "rotate(180deg)" : "none",
            }}
            onClick={() => {
              console.log("hhh");
              setToggled(!toggled);
            }}
          />
        </div>
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: active ? "#0D71F5" : "var(--description-color)",
              backgroundColor: active
                ? "var(--active-button-color)"
                : undefined,
              borderRadius: 5,
              padding: 10,
              ":hover": {
                backgroundColor: "var(--active-button-color) !important",
                color: "#0D71F5 !important",
                borderRadius: "5px !important",
              },
            }),
          }}
        >
          <MenuItem
            active={window.location.pathname === "/dashboard/main"}
            icon={<BiSolidDashboard size={iconSize} />}
            component={<Link href={"main"} />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/dashboard/class"}
            icon={<BiBookOpen size={iconSize} />}
            component={<Link href={"class"} />}
          >
            Class
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/dashboard/student"}
            icon={<BiGroup size={iconSize} />}
            component={<Link href={"student"} />}
          >
            Student
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/dashboard/attendance"}
            icon={<BiGroup size={iconSize} />}
            component={<Link href={"attendance"} />}
          >
            Attendance
          </MenuItem>
        </Menu>

        <Menu
          style={{
            marginBottom: "150px",
          }}
          menuItemStyles={{
            button: ({ active }) => ({
              color: active ? "#0D71F5" : "var(--description-color)",
              backgroundColor: active
                ? "var(--active-button-color)"
                : undefined,
              borderRadius: 5,
              padding: 10,
              ":hover": {
                backgroundColor: "var(--active-button-color) !important",
                color: "#0D71F5 !important",
                borderRadius: "5px !important",
              },
            }),
          }}
        >
          <MenuItem
            active={window.location.pathname === "/dashboard/setting"}
            icon={<CiSettings size={iconSize} />}
            component={<Link href={"setting"} />}
          >
            Setting
          </MenuItem>
          <MenuItem onClick={signout} icon={<BiLogOut size={iconSize} />}>
            Logout
          </MenuItem>
        </Menu>
        <div>
          <ProfileBadge toggled={toggled} />
        </div>
      </div>
    </Sidebar>
  );
};

export default SideMenu;
