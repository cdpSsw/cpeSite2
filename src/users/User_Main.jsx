import React, { useState } from "react";
import { Link } from "react-router-dom";

import emblem from "../public/emblem/emblem_red_white.png";

import Homepages from "./Homepages";
import Activities from "./homeComp/Activities";
import Contact from "./pages/Contact";

const User_Main = () => {
  const [activeComp, setActiveComp] = useState("home");
  const navList = [
    { name: "home" },
    { name: "activities" },
    { name: "coop" },
    { name: "comen/club" },
    { name: "contact" },
  ];

  return (
    <main className="user-main-container">
      <article className="desktop-view">
        <section className="nav-left-side">
          <img src={emblem} alt="emblem" className="emblem" />
          <ul className="nav-list">
            {navList.map((link, idx) => (
              <li key={idx}>
                <button
                  className={`
                        nav-link
                        ${activeComp === link.name ? "active" : ""}
                    `}
                  onClick={() => setActiveComp(link.name)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="nav-right-side btn-container">
          <button className="btn btn-signIn">Sign In</button>
          <button className="btn btn-signUp">Sign Up</button>
        </section>
      </article>

      <article className="mobile-view">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid nav">
            <section className="nav-box">
              <Link to="/" className="navbar-brand">
                <img src={emblem} alt="Emblem" className="emblem" />
              </Link>
              <button
                className="navbar-toggler icon-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMobile"
                aria-controls="navbarMobile"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <ion-icon name="menu-sharp"></ion-icon>
              </button>
            </section>

            <section
              className="nav-side collapse navbar-collapse"
              id="navbarMobile"
            >
              <ul className="nav-list">
                {navList.map((link, idx) => (
                  <li key={idx}>
                    <button
                      className={`
                        nav-link
                        ${activeComp === link.name ? "active" : ""}
                    `}
                      onClick={() => setActiveComp(link.name)}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              <section className="btn-container">
                <hr />
                <button className="btn btn-signIn">Sign In</button>
                <button className="btn btn-signUp">Sign Up</button>
              </section>
            </section>
          </div>
        </nav>
      </article>

      <article className="comp-container">
        {activeComp === "home" && <Homepages />}
        {activeComp === "activities" && <Activities />}
        {activeComp === "contact" && <Contact />}
      </article>
    </main>
  );
};

export default User_Main;
