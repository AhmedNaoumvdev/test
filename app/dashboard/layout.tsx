import "boxicons";
import "./Dashboard.css";
import SideMenu from "./components/SideMenu";

const Dashboard = () => {
  return (
    <div className="dashContainer">
      <SideMenu />
      <div className="maincontents"></div>
    </div>
  );
};

export default Dashboard;
