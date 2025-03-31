import React, { useState } from "react";
import { Link } from "react-router-dom";

// import emblem from "/public/emblem/emblem_red_white.png";

import Homepages from "../Homepages";
import Activities from "../pages/pActivities";
import Contact from "../pages/Contact";

const Nav = () => {
  const [ShowComp, setShowComp] = useState("homepages");

  const linkList = [
    { name: "Home", path: "/", value: "homepages" },
    { name: "Activities", path: "/Activities", value: "activities" },
    { name: "Coop", path: "" },
    { name: "CPE Club", path: "" },
    { name: "Contact", path: "/Contact", value: "contact" },
  ];

  return (
    <main className="nav-container">
      {/* <article className="for-desktop-size">
        <section className="left-side">
          <section className="emblem-container">
            <img src={emblem} alt="Emblem" className="emblem" />
          </section>

          <ul className="nav-list">
            {linkList.map((link, idx) => (
              <li key={idx}>
                {link.path ? (
                  <Link to={link.path} onClick={() => setShowComp(link.value)}>
                    {link.name}
                  </Link>
                ) : (
                  <button onClick={() => setShowComp(link.value)} disabled={!link.value}>
                    {link.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="right-side btn-container">
          <button className="btn btn-SignIn">
            <Link to="/SignInUp">Sign In</Link>
          </button>
          <button className="btn btn-SignUp">Sign Up</button>
        </section>
      </article> */}

      {/* <section className="content-container">
        {ShowComp === "homepages" && <Homepages />}
        {ShowComp === "activities" && <Activities />}
        {ShowComp === "contact" && <Contact />}
      </section>

      <article className="for-mobile-size">
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
              className="linkList collapse navbar-collapse"
              id="navbarMobile"
            >
              <ul className="nav-list">
                {linkList.map((link, idx) => (
                  <li key={idx} className="nav-item">
                    {link.path ? (
                      <Link className="nav-link" to={link.path}>
                        {link.name}
                      </Link>
                    ) : (
                      <button className="nav-link" disabled={!link.value}>
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <section className="btn-container">
                <hr />
                <button className="btn btn-SignIn">
                  <Link to="/SignInUp">Sign In</Link>
                </button>
                <button className="btn btn-SignUp">Sign Up</button>
              </section>
            </section>
          </div>
        </nav>
      </article> */}
    </main>
  );
};

export default Nav;
