import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "../public/main.css";

import Nav from "./components/Nav";
import Header from "./homeComp/Header";
import Activities from "./homeComp/Activities";
import Highlight from "./homeComp/Highlight";
import Course from "./homeComp/Course";
import Team from "./homeComp/Team";
import CareerP from "./homeComp/CareerP";
import Faqs from "./homeComp/Faqs";
import Showcase from "./homeComp/Showcase";

import Roadmap from "./pages/Roadmap";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const Homepages = () => {
  const activityRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         // เช็คเมื่อ element ปรากฏใน viewport
  //         if (entry.isIntersecting) {
  //           // เลื่อนลง 90vh เมื่อ activity-container-scroll ปรากฏ
  //           gsap.to(window, {
  //             duration: 1,
  //             scrollTo: { y: window.scrollY + window.innerHeight * 0.9, offsetY: 0 }, // เลื่อนลง 90vh
  //             ease: "power2.out",
  //           });
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.1, // กำหนดว่าเมื่อ 10% ของ element ปรากฏในหน้าจอ
  //     }
  //   );

  //   // เริ่มการสังเกตการณ์
  //   if (activityRef.current) {
  //     observer.observe(activityRef.current);
  //   }

  //   // ล้าง observer เมื่อ component ถูก unmount
  //   return () => {
  //     if (activityRef.current) {
  //       observer.unobserve(activityRef.current);
  //     }
  //   };
  // }, []);

  return (
    <main className="homp-container">
      {/* <blockquote 
        className="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style={{maxWidth:" 605px",minWidth: "325px"}}> <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ </section> </blockquote> */}
      <Nav />
      <Header />

      <Activities />
      <Highlight />
      {/* <Roadmap /> */}

      <Course />
      <Showcase /> 
      <Team />
      {/* <CareerP /> */}
      {/* <Faqs /> */}
    </main>
  );
};

export default Homepages;
