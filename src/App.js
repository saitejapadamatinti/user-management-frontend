import React from "react";
import SideBar from "./components/sidebar";
import ManageRoles from "./components/manageRoles";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import AddNewUser from "./components/addNewUser";
import "./App.css";

const App = () => {
  return (
    <div className="app-main-container">
      <SideBar />
      <div className="main-display-container">
      <Routes>
        <Route path="/" element={<ManageRoles />} />
        <Route path="/addUser" element={<AddNewUser />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
