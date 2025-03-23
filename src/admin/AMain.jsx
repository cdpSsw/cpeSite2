import React, { useState } from "react";
import { Link } from "react-router-dom";

import '../public/main.css';

import Logo from "../assets/logo_white.png";
import Dashboard from "./pages/ADashboard";
import Activities from "./pages/AActivities";
import Showcase from "./pages/AShowcase";
import Club from "./pages/Club";
import CareerP from "./pages/ACareerP";
import Faqs from "./pages/AFaqs";

// icons
import Icon_Dashb from "./assets/icons/dashb.svg";
import Icon_Activities from "./assets/icons/activities.svg";
import Icon_Showc from "./assets/icons/showc.svg";
import Icon_Club from "./assets/icons/club.svg";
import Icon_CareerP from "./assets/icons/careerP.svg";
import Icon_Faqs from "./assets/icons/faqs.svg";

const AMain = () => {
  const [ShowComp, setShowComp] = useState("dashboard");

  const topLinks = [
    {
      icon: Icon_Dashb,
      name: "Dashboard",
      path: "/",
      value: "dashboard",
    },
    {
      icon: Icon_Activities,
      name: "News & Event",
      path: "/AActivities",
      value: "activities",
    },
    {
      icon: Icon_Showc,
      name: "Showcase",
      path: "/AShowcase",
      value: "showcase",
    },

    { 
      icon: Icon_Club, 
      name: "Club", 
      path: "/AClub", 
      value: "club" 
    },
    {
      icon: Icon_CareerP,
      name: "Career Path",
      path: "/ACareerP",
      value: "careerp",
    },
    {
      icon: Icon_Faqs,
      name: "Faqs",
      path: "/AFaqs",
      value: "faqs",
    },
  ];

  const bottomLinks = [
    { icon: "settings-outline", name: "Setting", path: "/", value: "Setting" },
    { icon: "log-out-outline", name: "Log Out", path: "/", value: "Log Out" },
  ];

  return (
    <main className="amain-container">
      <section className="sidebar-container">
        <article className="nav-top">
          <img src={Logo} alt="Logo-Cpe" className="logo" />

          <ul className="nav-top nav-list">
            {topLinks.map((link, idx) => (
              <section key={idx}>
                <li to={link.path}>
                  <button
                    className={`
                      nav-link
                      ${ShowComp === link.value ? "active" : " "}
                    `}
                    onClick={() => setShowComp(link.value)}
                    data-text={link.name}
                  >
                    <section className="icons">
                      <img src={link.icon} alt="" />
                    </section>
                  </button>
                </li>
              </section>
            ))}
          </ul>
        </article>

        <ul className="nav-bottom nav-list">
          <div className="line-hr"></div>
          {bottomLinks.map((link, idx) => (
            <section key={idx}>
              <li to={link.path}>
                {idx === 0 ? (
                  <button
                    className={`
                      nav-link
                      ${ShowComp === link.value ? "active" : ""}
                    `}
                    onClick={() => setShowComp(link.value)}
                    data-text={link.name}
                  >
                    <ion-icon name={link.icon}></ion-icon>
                  </button>
                ) : (
                  <Link to={link.path}>
                    <button
                      className={`
                        nav-link
                        ${ShowComp === link.value ? "active" : ""}
                      `}
                      onClick={() => setShowComp(link.value)}
                      data-text={link.name}
                    >
                      <ion-icon name={link.icon}></ion-icon>
                    </button>
                  </Link>
                )}
              </li>
            </section>
          ))}
        </ul>
      </section>

      <section className="content-container">
        {ShowComp === "dashboard" && <Dashboard />}
        {ShowComp === "activities" && <Activities />}
        {ShowComp === "showcase" && <Showcase />}
        {ShowComp === "club" && <Club />}
        {ShowComp === "careerp" && <CareerP />}
        {ShowComp === "faqs" && <Faqs />}
      </section>
    </main>
  );
};

export default AMain;
