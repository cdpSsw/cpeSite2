import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
import ModalApprove from "../../components/ModalApprove";
import ModalDel from "../../components/ModalDel";
import notFound from "../../assets/images/page-not-found.svg";

const API_URL = import.meta.env.VITE_API_URL;

const A_Members = () => {
  // Get *Members
  const [members, setMembers] = useState([]);
  const handleMembers = async () => {
    try {
      const res = await Axios.get(`${API_URL}/SignUp`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setMembers(res.data);
      } else {
        alert(`Getting Members failed, check log`);
      }
    } catch (err) {
      alert(`Internal Server Error: ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Members | Admin";
    handleMembers();
  }, []);

  // sign up - set up
  const [studentID, setStudentID] = useState();
  const [role, setRole] = useState("student");
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post(
        `${API_URL}/signUp`,
        {
          studentID,
          role,
          fname,
          lname,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert(`Waiting for approval.`);
        location.reload();
      } else {
        alert(`Sign Up failed, try again later...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  const formRef = useRef(null);

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // Delete *Showcase
  const [delInfo, setDelInfo] = useState([]);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredMembers = members.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <main className="a-members-container">
      {/* Text Top */}
      <article className="top-container">
        <h1 className="topic m-0">Members Management</h1>

        <section className="btn-container mt-3">
          <section className="btn-left-side">
            <button
              className={`btn btn-all
                ${filter === "All" ? "active" : ""}
              `}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`btn btn-approved
                ${filter === "Approved" ? "active" : ""}
              `}
              onClick={() => setFilter("Approved")}
            >
              Approved
            </button>
            <button
              className={`btn btn-waiting
                ${filter === "Waiting" ? "active" : ""}
              `}
              onClick={() => setFilter("Waiting")}
            >
              Waiting
            </button>
          </section>

          <section className="btn-right-side">
            <button
              className="btn btn-add-new"
              data-bs-toggle="modal"
              data-bs-target="#signUp-modal"
              type="button"
            >
              Add New
            </button>
          </section>
        </section>
      </article>

      {/* Content */}
      {filteredMembers.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="svg-not-found" />
        </section>
      ) : (
        <article className="content-container">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Optional</th>
              </tr>
            </thead>
            {filteredMembers.map((member, idx) => (
              <tbody key={idx}>
                <tr>
                  <td>{idx + 1}</td>
                  <td>{member.studentID}</td>
                  <td>
                    {member.fname} {member.lname}
                  </td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>

                  <td className="optional-container">
                    <button
                      data-bs-toggle={
                        member.status === "Waiting" ? "modal" : ""
                      }
                      data-bs-target="#modal-approve"
                      className={`btn btn-approve
                    ${member.status === "Approved" ? "Approved" : "Waiting"} `}
                      onClick={() => setApproveItem(member)}
                    >
                      {member.status === "Approved" ? (
                        <span className="btn-content">
                          <ion-icon name="checkmark-circle"></ion-icon>
                          Approved
                        </span>
                      ) : (
                        <span className="btn-content">
                          <i class="bi bi-clock-history"></i>
                          Wating
                        </span>
                      )}
                    </button>
                    <button
                      className="btn btn-delete"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      onClick={() => setDelInfo(member)}
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </article>
      )}

      {/* Modal *Approve */}
      <ModalApprove approveItem={approveItem} approvePath="SignUp" />

      {/* Sing Up - Modal */}
      <Modal
        modalID="signUp-modal"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <>
            <form ref={formRef} className="form modal-add-new">
              <section className="text-top-container">
                <h1 className="topic">Add New *Member</h1>
                <hr />
              </section>

              {/* Student studentID or studentID & Role */}
              <section className="studentID-n-Role row">
                <div className="input-box col-md-7">
                  <input
                    type="text"
                    id="studentID"
                    placeholder="Student ID"
                    className="form-control mb-3"
                    onChange={(e) => setStudentID(e.target.value)}
                    required
                  />
                </div>

                <div className="input-box col-md-5">
                  <select
                    name="role"
                    studentID="role"
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select mb-3"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </section>

              {/* fname & lname */}
              <section className="studentID-n-Role row">
                <div className="input-box col-md-7">
                  <input
                    type="text"
                    id="fname"
                    placeholder="First Name"
                    className="form-control mb-3"
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>

                <div className="input-box col-md-5">
                  <input
                    type="text"
                    id="lname"
                    placeholder="Last Name"
                    className="form-control mb-3"
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>
              </section>

              {/* Email */}
              <div className="input-box">
                <input
                  type="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="form-control mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-box">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <section className="btn-container">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                  className="btn btn-cancel"
                >
                  Concel
                </button>
                <button className="btn btn-confirm" onClick={handleSignUp}>
                  Confirm
                </button>
              </section>
            </form>
          </>
        }
      />

      {/* Modal *Delete */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) Member"
        modalDelContent={delInfo}
        modalDelPath="signUp"
      />
    </main>
  );
};

export default A_Members;
