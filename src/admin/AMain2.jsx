import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

import "../public/main.css";

import Logo from "../assets/logo_white.png";
import Dashboard from "./pages/ADashboard";
import Activities from "./pages/AActivities";
import Showcase from "./pages/AShowcase";
import Club from "./pages/Club";
import CareerP from "./pages/ACareerP";
import Faqs from "./pages/AFaqs";
import BorrowReturn from "./pages/ABorrowReturn";

// icons
import Icon_Dashb from "./assets/icons/dashb.svg";
import Icon_Activities from "./assets/icons/activities.svg";
import Icon_Showc from "./assets/icons/showc.svg";
import Icon_Club from "./assets/icons/club.svg";
import Icon_CareerP from "./assets/icons/careerP.svg";
import Icon_Faqs from "./assets/icons/faqs.svg";
import Icon_Contruct from "../public/admin/icon-construct.svg";

const AMain = () => {
  const [ShowComp, setShowComp] = useState("Dashboard");
  const navigate = useNavigate();

  const token = Cookies.get("token");
  console.log(`token: ${token}`);

  // check cookie and role
  useEffect(() => {
    // check cookies
    const checkAdminAccess = async () => {
      const token = Cookies.get("token");
      // if (!token) {
      //   navigate("/");
      //   return;
      // }
    };

    checkAdminAccess();
  }, []);
  
  const handleSignOut = async (event) => {
    // console.log('press')
    event.preventDefault();
    try {
      const res = await Axios.post(
        `${API_URL}/signOut`,
        {},
        {
          withCredentials: true, // สำคัญ! เพื่อให้ backend จัดการ cookie ได้
        }
      );

      if (res.status === 200) {
        Cookies.remove("token"); // ลบ token ออกจาก cookie ฝั่ง client
        navigate("/"); // ไปหน้า login
      } else {
        alert(`Sign Out failed, try again later...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  const topLinks = [
    {
      icon: Icon_Dashb,
      name: "Dashboard",
    },
    {
      icon: Icon_Activities,
      name: "Showcase",
    },
    {
      icon: Icon_Showc,
      name: "",
    },

    {
      icon: Icon_Club,
      name: "Club",
    },
    {
      icon: Icon_CareerP,
      name: "Career Path",
    },
    {
      icon: Icon_Faqs,
      name: "Faqs",
    },
    {
      icon: Icon_Contruct,
      name: "Borrow Return",
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
                <li>
                  <button
                    className={`
                      nav-link
                      ${ShowComp === link.name ? "active" : " "}
                    `}
                    onClick={() => setShowComp(link.name)}
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
                  <button
                    className={`
              nav-link
              ${ShowComp === link.value ? "active" : ""}
            `}
                    onClick={handleSignOut} // This triggers the sign out
                  >
                    <ion-icon name={link.icon}></ion-icon>
                  </button>
                )}
              </li>
            </section>
          ))}
        </ul>
      </section>

      <section className="content-container">
        {ShowComp === "Dashboard" && <Dashboard />}
        {ShowComp === "Showcase" && <Showcase />}
        {/* {ShowComp === "Showcase" && <Showcase />} */}
        {ShowComp === "Club" && <Club />}
        {ShowComp === "Career Path" && <CareerP />}
        {ShowComp === "Faqs" && <Faqs />}
        {ShowComp === "Borrow Return" && <BorrowReturn />}
      </section>
    </main>
  );
};

export default AMain;
