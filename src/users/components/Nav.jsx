import React from "react";
import { Link } from "react-router-dom";

import emblem from "/public/emblem/emblem_white.png";

const Nav = () => {
  const linkList = [
    { name: "home", path: "/" },
    { name: "activities", path: "" },
    { name: "coop", path: "" },
    { name: "cpeclub", path: "" },
    { name: "contact", path: "/Contact" },
  ];
  return (
    <main className="nav-container">
      <article className="for-desktop-size">
        <section className="left-side">
          <section className="emblem-container">
            <img src={emblem} alt="emblem" className="emblem" />
          </section>

          <ul className="nav-list">
            {linkList.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="nav-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="right-side btn-container">
          <button className="btn btn-SignIn">Sign In</button>

          <button className="btn btn-SignUp">Sign Up</button>
        </section>
      </article>

      <article className="for-mobile-size">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid nav">
            <section className="nav-box">
              <a href="" className="navbar-brand">
                <img src={emblem} alt="emblem" className="emblem" />
              </a>
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
                    <Link className="nav-link" to={link.path}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <section className="btn-container">
                <hr />
                <button className="btn btn-SignIn">Sign In</button>
                <button className="btn btn-SignUp">Sign Up</button>
              </section>

            </section>
          </div>
        </nav>
      </article>
    </main>
  );
};

export default Nav;
