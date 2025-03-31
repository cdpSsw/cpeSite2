import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

import emblem from "../public/emblem/emblem_red.png";

import Stu_Dashboard from "./pages/Stu_Dashboard";
import Stu_Showcase from "./pages/Stu_Showcase";
import Stu_ShowTiktok from "./pages/Stu_ShowTiktok";
import Stu_Tools from "./pages/Stu_Tools";

const API_URL = import.meta.env.VITE_API_URL;

const Stu_Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student_id = location.state?.student_id;
  // const [student_id, setStudent_id] = useState(location.state?.student_id)
  // console.log(student_id);

  const [isOpen, setIsOpen] = useState(false);
  const [showComp, setShowComp] = useState("Showcase (Files)");
  const [showDropMenu, setShowDropMenu] = useState("Showcase (Files)");
  const items = ["Showcase (Files)", "Showcase (Tiktok)"];

  // Get *Personal Information
  const [information, setInformation] = useState([]);
  const handelInformarion = async (student_id) => {
    try{
      const res = await Axios.get(`${API_URL}/student/${student_id}`, { withCredentials: true });
      if(res.status === 200){
        setInformation(res.data);
      } else {
        alert(`Fetting Information Error`);
      }

    } catch(err){
      alert(`Internal server error: ${err.message}`);
    }
  } 

  useEffect(() => {
    if (student_id) {
      handelInformarion(student_id);
    }
  }, [student_id]);

  const navList = [
    // { name: "home" },
    { name: "Showcase (Files)" },
    { name: "Showcase (Tiktok)" },
    // { name: "tools" },
  ];

  // Handle SignOut
  const handleSignOut = async (event) => {
    // console.log("press");
    event.preventDefault();
    try {
      const res = await Axios.post(
        `${API_URL}/signOut`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        Cookies.remove("token");
        navigate("/");
      } else {
        alert(`Sign Out failed, try again later...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {}, []);

  return (
    <main className="stu-main-container">
      <article className="desktop-view">
        <section className="nav-left-side">
          <section className="top-container">
            <img src={emblem} alt="emblem" className="emblem" style={{ height: "50px" }}/>
            {information.map((info, idx) => (
              <h1 key={idx} className="user-name">| [{info.studentID}] {info.fname} {info.lname}</h1>
            ))}
          </section>
        </section>

        <section className="nav-right-side">
          <ul className="nav-list">
            <div className="dropdown-menu">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`btn btn-showcase
                  ${showComp === showDropMenu ? "active" : ""}
                `}
              >
                {showDropMenu ? showDropMenu : "Showcase"}
              </button>

              {isOpen && (
                <ul className="drop-child">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className={`nav-link`}
                      onClick={() => {
                        setIsOpen(false);
                        setShowComp(item);
                        setShowDropMenu(item);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ul>

          <section className="btn-container">
            <button onClick={handleSignOut} className="btn btn-signOut">
              Sign Out
            </button>
          </section>
        </section>
      </article>

      {/* Mobile View */}
      <article className="mobile-view">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid nav-container">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                location.reload();
              }}
              className="navbar-brand"
            >
              <img src={emblem} alt="emblem" className="emblem" />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#nav-mobile"
              aria-controls="nav-mobile"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="nav-mobile">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shoecase
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {items.map((item, index) => (
                      <li key={index}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowComp(item);
                          }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li
                  className={`nav-item nav-link members
                            ${showComp === "Members" ? "active" : ""}
                        `}
                  onClick={() => setShowComp("Members")}
                >
                  Members
                </li> */}

                <hr />
                <section className="btn-container">
                  <button onClick={handleSignOut} className="btn btn-signOut">
                    Sign Out
                  </button>
                </section>
              </ul>
            </div>
          </div>
        </nav>
      </article>
      <hr />

      <article className="showcomp-container">
        {/* {showComp === "home" && <Stu_Dashboard id={student_id}/>} */}
        {showComp === "Showcase (Files)" && <Stu_Showcase id={student_id} />}
        {showComp === "Showcase (Tiktok)" && <Stu_ShowTiktok id={student_id} />}
        {/* {showComp === "tools" && <Stu_Tools id={student_id} />} */}
      </article>
    </main>
  );
};

export default Stu_Main;
