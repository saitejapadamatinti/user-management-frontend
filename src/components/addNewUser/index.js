import React, { useEffect, useState } from "react";
import "./index.css";
import { Modal } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import axios, { Axios } from "axios";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const MembersData = [
  {
    avatar: "lgAvatar3",
    post: "",
    name: "UI/UX Designer",
    Companyname: "Luke Short",
  },
  {
    avatar: "lgAvatar2",
    post: "",
    name: "Quality Assurance",
    Companyname: "Lillian Powell",
  },
  {
    avatar: "lgAvatar2",
    post: "",
    name: "Website Designer",
    Companyname: "Rachel Parsons",
  },
  {
    avatar: "lgAvatar10",
    post: "",
    name: "Developer",
    Companyname: "John Hardacre",
  },
  {
    avatar: "lgAvatar11",
    post: "",
    name: "QA/QC Engineer",
    Companyname: "Jan Ince",
  },
  {
    avatar: "lgAvatar12",
    post: "",
    name: "Mobile developer",
    Companyname: "Steven Butler",
  },
  {
    avatar: "lgAvatar11",
    post: "",
    name: "UI/UX Designer",
    Companyname: "Robert Hammer",
  },
  {
    avatar: "lgAvatar12",
    post: "",
    name: "Quality Assurance",
    Companyname: "Paul Slater",
  },
  {
    avatar: "lgAvatar7",
    post: "",
    name: "Website Designer",
    Companyname: "Rachel Parsons",
  },
  {
    avatar: "lgAvatar7",
    post: "",
    name: "Website Designer",
    Companyname: "Rachel Parsons",
  },
];

const AddNewUser = () => {
  // model state
  const [isModal, setIsModal] = useState(false);

  // employee data state
  const [employeeData, setEmployeeData] = useState([]);
  const [addEmployeeEditing, setEmployeeEditing] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  // role state
  const [rolesData, setRolesData] = useState([]);

  // permission state
  const [permissionData, setPermissionData] = useState([]);

  // loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });

  // handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // fetching data from exployee data and role data
  useEffect(() => {
    axios
      .get("http://localhost:3005/employeesData")
      .then((response) => {
        // Handle successful response
        setEmployeeData(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        // Handle errors
        setLoading(false);
        setError(error.message);
      });

    // roles data fetching
    axios
      .get("http://localhost:3005/roles")
      .then((response) => {
        // Handle successful response
        setRolesData(response.data);
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
        setPermissionData(response.data);
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
      });
  }, []);

  // handle submit function
  const handlAddEmployeeeSubmit = (e) => {
    // posting data from form inputs to employee data
    const employeeDataUrl = "http://localhost:3005/employeesData";
    if (formData.password === formData.confirmPassword) {
      axios
        .post(employeeDataUrl, {
          userName: formData.username,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: formData.mobile,
          email: formData.email,
          designation: formData.designation,
        })
        .then((res) => setEmployeeData(res.data))
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });

      // storing only username passwords
      const url = "http://localhost:3005/usersData";
      axios
        .post(url, {
          userName: formData.username,
          password: formData.password,
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });

      setFormData({
        ...formData,
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        designation: "",
      });
    }
  };

  // on edit employee card data
  const editHandler = (id) => {
    setEmployeeEditing(true);
    const editedObject = employeeData.find((eachItem) => id === eachItem._id);
    setFormData({
      ...formData,
      username: editedObject.userName,
      password: editedObject.password,
      confirmPassword: editedObject.password,
      firstName: editedObject.firstName,
      lastName: editedObject.lastName,
      mobile: editedObject.mobile,
      email: editedObject.email,
      designation: editedObject.designation,
    });
    setEmployeeId(id);
    setIsModal(true);
  };

  // on edit employee posting editied data
  const onEmployeeEditHandl = () => {
    const url = `http://localhost:3005/employeesData`;
    axios
      .put(url, {
        _id: employeeId,
        userName: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        email: formData.email,
        designation: formData.designation,
      })
      .then((res) => setEmployeeData(res.data))
      .catch((error) => {
        setError(error.message);
      });
    setFormData({
      ...formData,
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      designation: "",
    });
    setEmployeeId("");
    setIsModal(false)
  };

  // on delete handler data
  const onEmployeeDelete = (id) => {
    axios
      .delete(`http://localhost:3005/employeesData/${id}`)
      .then((res) => setEmployeeData(res.data))
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div></div>
      <Modal
        centered
        show={isModal}
        size="lg"
        onHide={() => {
          setIsModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <form>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input
                  className="form-control"
                  type="text"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile:</label>
                <input
                  className="form-control"
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Designation</label>
                <select onChange={handleChange} className="form-select">
                  {rolesData.map((eachRole) => (
                    <option value={eachRole._id}>{eachRole.role}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {addEmployeeEditing ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onEmployeeEditHandl()}
            >
              Edit
            </button>
          ) : (
            <>
              {" "}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsModal(false);
                }}
              >
                Done
              </button>
              <button
                onClick={() => handlAddEmployeeeSubmit()}
                className="btn btn-primary"
              >
                Sent
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <div>
        <button
          onClick={() => setIsModal(true)}
          className="add-new-user-button"
        >
          <BsPlusCircle /> Add New User
        </button>
      </div>
      <div className="employee-cards-div">
        {employeeData.map((eachUser) => (
          <div className="user-details-card">
            <h3>{eachUser.userName}</h3>
            <p>{eachUser.mobile}</p>
            <p>{eachUser.email}</p>
            <div>
              <FiEdit
                onClick={() => editHandler(eachUser._id)}
                className="manage-roles-edit-icon"
              />
              <MdDelete
                onClick={() => onEmployeeDelete(eachUser._id)}
                className="manage-roles-delete-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNewUser;
