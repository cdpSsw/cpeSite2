import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "../public/main.css";

import Header from "./homeComp/Header";
import Activities from "./homeComp/Activities";
import Highlight from "./homeComp/Highlight";
import Course from "./homeComp/Course";
import Team from "./homeComp/Team";
import CareerP from "./homeComp/CareerP";
import Faqs from "./homeComp/Faqs";
import Showcase from "./homeComp/Showcase";
import ShowTiktok from "./homeComp/ShowTiktok";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const Homepages = () => {
  const activityRef = useRef(null);
  useEffect(() => {
    document.title = "Homepage | Comen - SPU";
  }, []);
  return (
    <main className="homp-container">
      {/* <blockquote 
        className="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style={{maxWidth:" 605px",minWidth: "325px"}}> <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ </section> </blockquote> */}
      {/* <Nav /> */}
      <Header />

      {/* <Activities /> */}
      <Showcase />
      <Highlight />
      {/* <Roadmap /> */}

      {/* <Course /> */}
      <ShowTiktok /> 
      <Team />
      {/* <CareerP /> */}
      {/* <Faqs /> */}
    </main>
  );
};

export default Homepages;
