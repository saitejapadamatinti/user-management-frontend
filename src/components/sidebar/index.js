import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

const SideBar = () => {
  return (
    <div className="side-bar-main-div">
      <div className="side-bar-items-div">
        <NavLink
          exact
          className={({ isActive }) =>
            isActive ? "side-bar-link-item active-side-bar" : "side-bar-link-item"
          }
          to="/"
        >
          Manage Roles
        </NavLink>
        <NavLink
          exact
          className={({ isActive }) =>
            isActive ? "side-bar-link-item active-side-bar" : "side-bar-link-item"
          }
          to="/addUser"
        >
          Manage Users
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
