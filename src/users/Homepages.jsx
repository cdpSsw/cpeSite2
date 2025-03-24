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
      <Nav />
      <Header />

      <Activities />
      <Highlight />

      <Course />
      {/* <Showcase />  */}
      <Team />
      <CareerP />
      <Faqs />
    </main>
  );
};

export default Homepages;
