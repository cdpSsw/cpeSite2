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

import Modal from '../../components/Modal'

import j from "../assets/home-assets/person/j.png";
import b from "../assets/home-assets/person/b.png";
import n from "../assets/home-assets/person/n.png";
import p from "../assets/home-assets/person/p.jpg";

const Team = () => {
  const conRef = useRef(null);
  const imgRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [select, setSelect] = useState([]);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const teams_info = [
    { topic: "Our Team", description: "ผู้เชี่ยวชาญที่ถ่ายทอดความรู้และแรงบันดาลใจสู่อนาคตเทคโนโลยี" },
  ];

  const team_detail = [
    {
      img: j,
      name: "ผู้ช่วยศาสตราจารย์ จิโรจน์ จริตควร",
      position: "หัวหน้าสาขาวิชาวิศวกรรมคอมพิวเตอร์",
      tel: "0 2579 1111 ต่อ 2197",
      email: "chirot.ch@spu.ac.th",
      education: [
        { degree: "ปริญญาโท", field: "M.Eng. (Microelectronics)", institution: "Asian Institute of Technology, Thailand" },
        { degree: "ปริญญาตรี", field: "วิศวกรรมศาสตรบัณฑิต (วิศวกรรมไฟฟ้า)", institution: "มหาวิทยาลัยศรีปทุม" },
      ],
      expertise: [
        "Hardware. Digital & analog circuit design",
        "IoT (Embedded system)",
        "Robotics and Hardware Interfaces",
      ],
      work_experience: [
        { position: "หัวหน้าสาขาวิศวกรรมคอมพิวเตอร์", institution: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม", duration: "2553 – ปัจจุบัน" },
        { position: "อาจารย์ประจำ", institution: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม", duration: "2551 – 2552" },
      ],
    },
    { img: b, name: "ดร.สุรชัย ทองแก้ว", position: "อาจารย์ประจำ", tel: "0 2579 1111 ต่อ 2212", email: "surachai.th@spu.ac.th" },
    { img: n, name: "อาจารย์นิมิตร ทักษวิทยาพงศ์", position: "อาจารย์ประจำ", tel: "0 2579 1111 ต่อ 2212", email: "nimit.tu@spu.ac.th" },
    { img: p, name: "อาจารย์ภูริลาภ จุฑาวัชระพล", position: "อาจารย์ประจำ", tel: "0 2579 1111 ต่อ 2212", email: "purilarp.ch@spu.ac.th" },
  ];

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
              animationFrom={{ opacity: 0, transform: "translate3d(0,80px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
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
              autoplay={{ delay: 5500, disableOnInteraction: false }}
              initialSlide={0}
              slidesPerView={1}
              pagination={true}
              modules={[Autoplay, Pagination]}
              className="swiper-mobile"
            >
              {team_detail.map((detail, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    data-bs-toggle="modal"
                    data-bs-target={`#show-details-${idx + 1}`}
                    onClick={() => setSelect([detail])}
                    ref={(el) => (imgRefs.current[idx] = el)}
                    src={detail.img}
                    alt={detail.name}
                  />
                  <section className="text-bottom-container">
                    <h1 className="name">{detail.name}</h1>
                    <p className="position">{detail.position}</p>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
        ) : (
          <article className="desktop-view">
            {team_detail.map((detail, idx) => (
              <section key={idx} className="col-md-3">
                <section className="content-box">
                  <img
                    data-bs-toggle="modal"
                    data-bs-target={`#show-details-${idx + 1}`}
                    onClick={() => setSelect([detail])}
                    src={detail.img}
                    alt={detail.name}
                  />
                  <section className="text-bottom-container">
                    <h1 className="name">{detail.name}</h1>
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

      {/* {team_detail.map((detail, idx) => (
        <Modal
          key={idx}
          modalID={`show-details-${idx + 1}`} // Dynamic modal ID
          modalHeaderStyle="d-none"
          modalFooterStyle="d-none"
          modalBodyContent={
            <article>
              <section className="row m-0">
                <section className="col-md-6">
                  <img src={detail.img} alt={detail.name} style={{ width: '100%' }} />
                </section>
                <section className="col-md-6 text-bottom-container">
                  <p>{detail.position}</p>
                  <h1>{detail.name}</h1>

                  <h3>วุฒิการศึกษา</h3>
                  {detail.education.map((edu, eduIdx) => (
                    <section key={eduIdx}>
                      <p>{edu.degree}</p>
                      <p>{edu.field}</p>
                      <p>{edu.institution}</p>
                    </section>
                  ))}
                  <h4>ความเชี่ยวชาญ</h4>
                  <ul>
                    {detail.expertise.map((exp, expIdx) => (
                      <li key={expIdx}>{exp}</li>
                    ))}
                  </ul>

                  <h5>ประสบการณ์การทำงาน:</h5>
                  {detail.work_experience.map((exp, expIdx) => (
                    <section key={expIdx}>
                      <p>{exp.position} - {exp.institution} ({exp.duration})</p>
                    </section>
                  ))}
                </section>
              </section>
            </article>
          }
        />
      ))} */}
    </main>
  );
};

export default Team;
