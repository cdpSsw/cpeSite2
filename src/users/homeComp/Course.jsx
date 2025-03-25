import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/pagination";

import construct from "/public/users/home-assets/construct.svg";
import priority from "/public/users/home-assets/priority.svg";
import network from "/public/users/home-assets/network.svg";

const Course = () => {
  const conRef = useRef(null);
  const boxRefs = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const topic1Ref = useRef(null);
  const topic2Ref = useRef(null);
  const descRef = useRef(null);
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

  const course_topic = [
    {
      main_topic1: "หลักสูตรวิศวกรรมศาสตรบัณฑิต",
      main_topic2: "{ วิศวกรรมคอมพิวเตอร์ }",
    },
  ];
  const course_detail = [
    {
      icon: construct,
      topic: "พื้นฐานของการศึกษา",
      description:
        "สาขาวิศวกรรมคอมพิวเตอร์เน้นการเรียนรู้พื้นฐานทางวิศวกรรมและวิทยาการคอมพิวเตอร์ โดยมุ่งเน้นการออกแบบระบบทั้งฮาร์ดแวร์และซอฟต์แวร์สำหรับการประมวลผลข้อมูลสารสนเทศต่างๆ",
    },
    {
      icon: priority,
      topic: "ตำแหน่งงานและบทบาท",
      description:
        "บัณฑิตสามารถทำงานเป็นนักออกแบบระบบคอมพิวเตอร์ วิศวกรซอฟต์แวร์ ฝ่ายสนับสนุนเทคนิค ผู้พัฒนาโปรแกรมธุรกิจ และผู้บริหารระบบเครือข่ายและคอมพิวเตอร์ได้",
    },
    {
      icon: network,
      topic: "โอกาสทางอาชีพและความก้าวหน้า",
      description:
        "ผู้จบการศึกษามีโอกาสทำงานในภาคธุรกิจเทคโนโลยีสารสนเทศได้อย่างกว้างขวาง มีความก้าวหน้าในสายอาชีพ และมีศักยภาพในการเป็นผู้ประกอบการ SME ด้านเทคโนโลยี",
    },
  ];

  useEffect(() => {
    if (!isMobile) {
      boxRefs.current.forEach((box) => {
        if (box) {
          gsap.fromTo(box, { x: 100, opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: {
            trigger: conRef.current,
            start: "top bottom",
            end: "bottom bottom",
            // markers: true,
            scrub: 1,
          }});

          box.addEventListener("mouseenter", () => gsap.to(box, { y: -10 }));
          box.addEventListener("mouseleave", () => gsap.to(box, { y: 0 }));
        }
      });
    }
  }, [isMobile]);

  return (
    <main ref={conRef} className="course-container">
      <article>
        {course_topic.map((topic, idx) => (
          <section className="text-top-container row" key={idx}>
            <section className="topic-container col-md-7">
                <h1 ref={topic1Ref} className="main_topic">
                  {topic.main_topic1}
                </h1>
                <h1 ref={topic2Ref} className="main_topic">
                  {topic.main_topic2}
                </h1>
            </section>
          </section>
        ))}
      </article>

      <article className="content-container">
        {isMobile ? (
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {course_detail.map((detail, idx) => (
              <SwiperSlide key={idx}>
                <section className="content-swiper">
                  <section className="content-box-inner">
                    <hr />
                    <span className="text-topic">
                      <img src={detail.icon} alt={detail.topic} />
                      <h1 className="topic">{detail.topic}</h1>
                    </span>
                    <p className="desc">{detail.description}</p>
                  </section>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <article className="desktop-view row m-0">
              {course_detail.map((detail, idx) => (
                <section
                  ref={(el) => (boxRefs.current[idx] = el)}
                  key={idx}
                  className="col-md-4"
                >
                  <section className="content-box-inner">
                    <hr />
                    <span className="text-topic">
                      <img src={detail.icon} alt={detail.topic} />
                      <h1 className="topic">{detail.topic}</h1>
                    </span>
                    <p className="desc">{detail.description}</p>
                  </section>
                </section>
              ))}
          </article>
        )}
      </article>
    </main>
  );
};

export default Course;
