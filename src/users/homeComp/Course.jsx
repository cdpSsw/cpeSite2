import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/pagination";

import construct from "../assets/home-assets/construct.svg";
import priority from "../assets/home-assets/priority.svg";
import network from "../assets/home-assets/network.svg";

const Course = () => {
  const conRef = useRef(null);
  const boxRefs = useRef([]);
  const topic1Ref = useRef(null);
  const topic2Ref = useRef(null);
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
          gsap.fromTo(
            box,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: conRef.current,
                start: "top bottom",
                end: "top 50%",
                // markers: true,
                scrub: 1,
              },
            }
          );

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
          <article className="mobile-view">
            <svg
             className="line-wave-tablet"
              width="850"
              height="275"
              viewBox="0 0 850 275"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 209.948C20.0472 209.948 77.9125 66.5935 130.189 113.844C195.535 172.908 152.306 318.565 260.378 225.965C368.451 133.365 334.772 -8.28712 410.171 47.7732C485.571 103.834 528.297 282.025 568.51 225.965C608.723 169.905 698.699 -46.8284 734.388 38.7637C770.077 124.356 799.734 225.965 850 225.965"
                stroke="url(#paint0_linear_2033_663)"
                stroke-width="37"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2033_663"
                  x1="-4.30381"
                  y1="253"
                  x2="755.904"
                  y2="-143.954"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#840013" />
                  <stop offset="1" stop-color="#B21010" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              className="line-wave-mobile"
              width="393"
              height="216"
              viewBox="0 0 393 216"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 178.381C9.09091 178.381 34.76 37.1806 130.22 145.904C249.546 281.808 299.87 149.901 318.029 112.927C336.187 75.9534 394.293 10 400 10"
                stroke="url(#paint0_linear_2029_630)"
                stroke-width="20"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2029_630"
                  x1="-2.02532"
                  y1="203.519"
                  x2="416.327"
                  y2="79.2155"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#840013" />
                  <stop offset="1" stop-color="#B21010" />
                </linearGradient>
              </defs>
            </svg>

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
          </article>
        ) : (
          <article className="desktop-view row m-0">
            <svg
              className="line-wave-desktop"
              width="1440"
              height="412"
              viewBox="0 0 1440 412"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-29.9141 154.5C16.497 51.5826 25.2691 -27.5381 85.4006 82.9963C160.565 221.164 -2.29117 306.988 172.377 362.787C347.044 418.585 323.421 118.07 466.233 44.4688C609.045 -29.1322 704.254 41.8117 763.669 236.044C823.085 430.276 894.313 286.263 965.898 165.366C1037.48 44.4688 1128.76 -20.0981 1176.36 100.533C1223.96 221.164 1299.13 489.529 1382.52 362.787C1449.24 261.392 1534.64 165.366 1569 130.027"
                stroke="url(#paint0_linear_1989_877)"
                stroke-width="22"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1989_877"
                  x1="-129"
                  y1="206"
                  x2="1569"
                  y2="206"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#840013" />
                  <stop offset="1" stop-color="#B21010" />
                </linearGradient>
              </defs>
            </svg>

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
