import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

import emblem from "../assets/emblem/emblem_red.png";
import A_Showcase from "./pages/A_Showcase";
import A_ShowTiktok from "./pages/A_ShowTiktok";
import A_Members from "./pages/A_Members";

const A_Main = () => {
  const navigate = useNavigate();
  const [showComp, setShowComp] = useState("Showcase (Files)");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropMenu, setShowDropMenu] = useState("Showcase (Files)");
  const items = ["Showcase (Files)", "Showcase (Tiktok)"];

  // Handle *Sign Out /Delete Token + Redirect
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post(
        `${API_URL}/signOut`,
        {},
        { withCredentials: true }
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

  return (
    <main className="a-main-container">
      <article className="desktop-view">
        <section className="emblem-container">
          <img src={emblem} alt="emblem" className="emblem" />
        </section>
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
          <li 
            className={`nav-link members
                ${showComp === 'Members' ? "active" : ""}
            `}
            onClick={() => setShowComp("Members")}
        >
            Members
          </li>
        </ul>

        <section className="btn-container">
          <button 
            onClick={handleSignOut}
            className="btn btn-signOut"
        >
            Sign Out
        </button>
        </section>
      </article>

       {/* Mobile View */}
       <article className="mobile-view">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid nav-container">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); location.reload(); }} 
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
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
                <li 
                  className={`nav-item nav-link members
                      ${showComp === 'Members' ? "active" : ""}
                  `}
                  onClick={() => setShowComp("Members")}
              >
                  Members
                </li>
                
                <hr />
                <section className="btn-container">
                  <button 
                    onClick={handleSignOut}
                    className="btn btn-signOut"
                >
                    Sign Out
                </button>
                </section>
              </ul>
            </div>
          </div>
        </nav>
      </article>
      <hr />

      <article className="showComp-container">
        {showComp === "Showcase (Files)" && <A_Showcase />}
        {showComp === "Showcase (Tiktok)" && <A_ShowTiktok />}
        {showComp === "Members" && <A_Members />}
      </article>
    </main>
  );
};

export default A_Main;
