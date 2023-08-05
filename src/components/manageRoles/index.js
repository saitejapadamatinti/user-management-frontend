import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

// const roles = [
//   {
//     id: 1,
//     role: "UIUX Designer",
//   },
//   {
//     id: 2,
//     role: "HR",
//   },
//   {
//     id: 3,
//     role: "Designer",
//   },
//   {
//     id: 4,
//     role: "Developer",
//   },
//   {
//     id: 5,
//     role: "Tester",
//   },
// ];

const allMenus = ["Project", "Tickets", "Client", "Employees"];

const base_url = "http://localhost:3005/roles";

const ManageRoles = () => {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleId, setRoleId] = useState(null);

  const [roleEditing, setRoleEditing] = useState(false);

  const [rolesList, setRolesList] = useState([]);

  const [permissionNameState, setPermissionsNameState] = useState("");
  const [permissionId, setPermissionId] = useState();
  const [permissionsList, setPermissionsList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [permissionEditing, setPermissionEditing] = useState(false);

  useEffect(() => {
    // Fetch roles data using GET request when the component mounts
    axios
      .get("http://localhost:3005/roles")
      .then((response) => {
        // Handle successful response
        setRolesList(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        // Handle errors
        setLoading(false);
        setError(error.message);
      });

    // Fetch Permission data
    axios
      .get("http://localhost:3005/permissions")
      .then((response) => {
        // Handle successful response
        setPermissionsList(response.data);
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roleEditing === false) {
      const url = "http://localhost:3005/roles";
      axios
        .post(url, {
          role: roleName,
          description: roleDescription,
        })
        .then((res) => setRolesList(res.data))
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
      setRoleName("");
      setRoleDescription("");
    } else {
      if (roleName === "") {
        alert("add data");
      } else {
        const url = `http://localhost:3005/roles`;
        axios
          .put(url, {
            _id: roleId,
            role: roleName,
            description: roleDescription,
          })
          .then((res) => setRolesList(res.data))
          .catch((error) => {
            setError(error.message);
          });
        setRoleEditing(false);
        setRoleName("");
        setRoleDescription("");
        setRoleId("");
      }
    }
  };

  const roleEditHandler = (id) => {
    setRoleEditing(true);
    const editedObject = rolesList.find((eachItem) => id === eachItem._id);
    setRoleName(editedObject.role);
    setRoleDescription(editedObject.description);
    setRoleId(id);
  };

  const onRoleDeleteHandler = (id) => {
    axios
      .delete(`http://localhost:3005/roles/${id}`)
      .then((res) => setRolesList(res.data))
      .catch((error) => {
        setError(error.message);
      });
  };

  // -----------------------------------  on submit permisson   -------------------------------------------------------------------

  const onSubmitPermission = (e) => {
    e.preventDefault();
    // checking is permission list true of false
    if (permissionEditing === true) {
      if (permissionNameState === "") {
        alert("add data");
      } else {
        const url = `http://localhost:3005/permissions`;
        axios
          .put(url, {
            _id: permissionId,
            permissionName: permissionNameState,
          })
          .then((res) => setPermissionsList(res.data))
          .catch((error) => {
            setError(error.message);
          });
        setPermissionEditing(false);
        setPermissionsNameState("");
        setPermissionId("");
      }
    }

    if (permissionEditing === false) {
      const url = "http://localhost:3005/permissions";
      axios
        .post(url, {
          permissionName: permissionNameState,
        })
        .then((res) => setPermissionsList(res.data))
        .catch((error) => {
          setError(error.message);
        });
      setPermissionsNameState("");
    }
  };

  const editHandler = (id) => {
    setPermissionEditing(true);
    const editedObject = permissionsList.find(
      (eachItem) => id === eachItem._id
    );
    setPermissionsNameState(editedObject.permissionName);
    setPermissionId(id);
  };

  const onPermissionDelete = (id) => {
    axios
      .delete(`http://localhost:3005/permissions/${id}`)
      .then((res) => setPermissionsList(res.data))
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="pt-5">
      <div>
        <h1>Roles and attach Permissions</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="manage-roles-input-container">
              <label for="exampleFormControlInput877" class="form-label">
                Role Name:
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput877"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </div>
            <div className="manage-roles-input-container">
              <label for="exampleFormControlInput878" class="form-label">
                Role Description:
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput878"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                required
              />
            </div>
            {permissionEditing === true ? (
              <button type="submit" className="manage-roles-button">
                Edit Permission
              </button>
            ) : (
              <button type="submit" className="manage-roles-button">
                Create Role
              </button>
            )}
          </form>
          <div className="roles-list-container">
            {rolesList.map((eachRole) => (
              <span className="each-role-item" key={eachRole._id}>
                {eachRole.role}
                <FiEdit
                  onClick={() => roleEditHandler(eachRole._id)}
                  className="manage-roles-edit-icon"
                />
                <MdDelete
                  onClick={() => onRoleDeleteHandler(eachRole._id)}
                  className="manage-roles-delete-icon"
                />
              </span>
            ))}
          </div>
          {/* -----------------------------------   permissons  --------------------------------------------------------- */}

          <hr />
          <div>
            <div>
              <h2 className="mb-4">Permissions List</h2>
            </div>
            <form onSubmit={onSubmitPermission}>
              <div className="manage-roles-input-container">
                <label for="exampleFormControlInput878" class="form-label">
                  Permission:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput878"
                  value={permissionNameState}
                  onChange={(e) => setPermissionsNameState(e.target.value)}
                  required
                />
              </div>
              {permissionEditing === true ? (
                <button type="submit" className="manage-roles-button">
                  Edit Permission
                </button>
              ) : (
                <button type="submit" className="manage-roles-button">
                  Create Permission
                </button>
              )}
            </form>
            <div className="roles-list-container">
              {permissionsList.map((eachRole) => (
                <span className="each-role-item" key={eachRole._id}>
                  {eachRole.permissionName}
                  <FiEdit
                    onClick={() => editHandler(eachRole._id)}
                    className="manage-roles-edit-icon"
                  />
                  <MdDelete
                    onClick={() => onPermissionDelete(eachRole._id)}
                    className="manage-roles-delete-icon"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoles;
