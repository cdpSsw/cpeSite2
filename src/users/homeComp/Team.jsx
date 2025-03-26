import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/pagination";

import SplitText from "../components/SplitText";
import Particles from "../components/Particles";

import j from "/public/users/home-assets/person/j.png";
import b from "/public/users/home-assets/person/b.png";
import n from "/public/users/home-assets/person/n.png";

const Team = () => {
  const conRef = useRef(null);
  const imgRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    // ตรวจสอบขนาดหน้าจอตอนโหลดครั้งแรก
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const teams_info = [
    {
      topic: "Our Team",
      description:
        "It is a long established fact that a reader will be distracted by the readable",
    },
  ];

  const team_detail = [
    {
      img: j,
      fname: "CHIROT",
      lname: "CHARITKHUAN",
      position: "Position",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
    {
      img: b,
      fname: "SURACHAI",
      lname: "THONGKAEW",
      position: "Position",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
    {
      img: n,
      fname: "NIMIT",
      lname: "TUKSAVITAYAPONG",
      position: "Position",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
    {
      img: n,
      fname: "NIMIT",
      lname: "TUKSAVITAYAPONG",
      position: "Position",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
  ];

  // useEffect(() => {
  //   imgRefs.current.forEach(img => {
  //     gsap.timeline({
  //       scrollTrigger: {
  //         trigger: conRef.current,
  //         start: "top top",
  //         end: "top top",
  //         scrub: 1,
  //         markers: true,
  //       }
  //     }).fromTo(
  //       img,
  //       { rotateY: 100 },
  //       { rotateY: 0 }
  //     )
  //   });
  // }, [])

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <main ref={conRef} className="team-container">
      {teams_info.map((info, idx) => (
        <section key={idx} className="text-top-container">
          <h1 className="topic">
            <SplitText
              text={info.topic}
              delay={50}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,80px,0)",
              }}
              animationTo={{
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
              }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-20px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </h1>
          <p className="desc">{info.description}</p>
        </section>
      ))}

      <article className="content-container">
        {isMobile ? (
          <article className="mobile-view">
            <Swiper
              grabCursor={true}
              centeredSlides={true}
              autoplay={{
                delay: 5500, disableOnInteraction: false
              }}
              initialSlide={0}
              slidesPerView={1}
              pagination={true}
              modules={[ Autoplay, Pagination ]}
              className="swiper-mobile"
            >
              {team_detail.map((detail, idx) => (
                <SwiperSlide>
                  <img
                    ref={(el) => (imgRefs.current[idx] = el)}
                    src={detail.img}
                    alt={detail.fname}
                  />
                  <section className="text-bottom-container">
                    <h1 className="name fname">{detail.fname}</h1>
                    <h1 className="name lname">{detail.lname}</h1>
                    <p className="position">{detail.position}</p>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
        ) : (
          <article className="desktop-view">
            {team_detail.map((detail, idx) => (
              <section
                ref={(el) => (imgRefs.current[idx] = el)}
                key={idx}
                className="col-md-3"
              >
                <section className="content-box">
                  <img
                    ref={(el) => (imgRefs.current[idx] = el)}
                    src={detail.img}
                    alt={detail.fname}
                  />
                  <section className="text-bottom-container">
                    <h1 className="name fname">{detail.fname}</h1>
                    <h1 className="name lname">{detail.lname}</h1>
                    <p className="position">{detail.position}</p>
                  </section>
                </section>
              </section>
            ))}
          </article>
        )}
      </article>

      <Particles
        particleColors={["#2C2C2C", "#2C2C2C"]}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
    </main>
  );
};

export default Team;
