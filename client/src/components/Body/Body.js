import React, { useEffect, useRef, useState } from "react";
import Axios from "../../axios/axios";
import { deleteUser, editUser } from "../../urls/urls";
import "./Body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function Body({ user, userDetails }) {
  const inputRef = useRef();
  const tableRef = useRef();

  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [userDetailsArr, setUserDetailsArr] = useState([]);
  useEffect(() => {
    setUserDetailsArr(userDetails);
  }, [userDetails]);

  const customTable = {
    borderRadius: "6px",
    overflow: "hidden",
    width: "45rem",
    textAlign: "center",
  };

  const customHead = {
    backgroundColor: "#19191c",
    color: "white",
    fontWeight: "normal",
  };

  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = inputRef.current;
    filter = input.value.toUpperCase();
    table = tableRef.current;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
  const deleteUserSubmit = () => {
    Axios.delete(deleteUser, {
      data: {
        userId,
      },
    }).then(({ data }) => {
      setUserDetailsArr(userDetailsArr.filter((data) => data._id !== userId));
      setUserId("");
    });
  };

  const editUserSubmit = () => {
    Axios.patch(editUser, {
      data: {
        userId,
        firstname,
        lastname,
        email,
        phone,
      },
    }).then(({ data }) => {
      console.log(data);
      const updatedUser = userDetailsArr.map((currentUser) => {
        if (currentUser._id === userId) {
          return data.userDetails;
        }
        return currentUser;
      });
      setUserDetailsArr(updatedUser);
      setUserId("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
    });
  };

  return (
    <>
      {user ? (
        <div className="login-card2">
          <h2>Welcome to User Home</h2>
        </div>
      ) : (
        <div className="login-card2">
          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit User!
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="signup-form">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <input
                          type="text"
                          placeholder="Fisrt Name"
                          name="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="text"
                          placeholder="Email Address"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="text"
                          placeholder="Phone Number"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-save"
                    data-bs-dismiss="modal"
                    onClick={editUserSubmit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Are you sure?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  You can't revert back it after!
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteUserSubmit}
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {userDetails ? (
            <div className="fixTableHead">
              <div
                className="input-group rounded mb-1"
                style={{ width: "35%" }}
              >
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  style={{ height: "10%", backgroundColor: "#f8f9fa" }}
                  id="myInput"
                  ref={inputRef}
                  onKeyUp={myFunction}
                />
                <span
                  className="input-group-text border-0"
                  id="search-addon"
                  style={{ backgroundColor: "rgb(25, 25, 28)", color: "#fff" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
              </div>
              <table
                className="table table-light table-hover"
                style={customTable}
                id="myTable"
                ref={tableRef}
              >
                <thead>
                  <tr>
                    <th style={customHead} scope="col">
                      No
                    </th>
                    <th style={customHead} scope="col">
                      Fullname
                    </th>
                    <th style={customHead} scope="col">
                      Email
                    </th>
                    <th style={customHead} scope="col">
                      Phone
                    </th>
                    <th style={customHead} scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userDetailsArr.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.firstname + " " + data.lastname}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>
                        <button className="mx-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#004fca"
                            className="bi bi-pencil-square"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2"
                            onClick={() => {
                              setUserId(data._id);
                              setFirstname(data.firstname);
                              setLastname(data.lastname);
                              setEmail(data.email);
                              setPhone(data.phone);
                            }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                        <button
                          className="mx-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setUserId(data._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#ff0000"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>Welcome to Admin Home</h2>
          )}
        </div>
      )}
    </>
  );
}

export default Body;
