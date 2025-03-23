import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

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

  const course_topic = [
    {
      main_topic1: "หลักสูตรวิศวกรรมศาสตรบัณฑิต",
      main_topic2: "{ วิศวกรรมคอมพิวเตอร์ }",
      sub_topic:
        "สาขาวิศวกรรมคอมพิวเตอร์มุ่งเน้นการเรียนรู้พื้นฐานทางวิศวกรรมและวิทยาการคอมพิวเตอร์ทั้งด้านฮาร์ดแวร์และซอฟต์แวร์ ด้วยความรู้และทักษะที่ได้รับผู้จบการศึกษาจึงมีโอกาสทำงานในภาคธุรกิจเทคโนโลยีสารสนเทศได้อย่างกว้างขวาง มีความก้าวหน้าในสายอาชีพ และมีศักยภาพในการเป็นผู้ประกอบการ SME ด้านเทคโนโลยีได้อีกด้วย",
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
    boxRefs.current.forEach((box) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: conRef.current,
          start: "top top",
          end: "top 50%",
          scrub: 1,
        },
      });

      tl.fromTo(box, { x: 100, opacity: 0 }, { x: 0, opacity: 1 });

      tl.fromTo(
        [topic1Ref.current, topic2Ref.current, descRef.current],
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1 }
      );

      // Hover effect on each box
      box.addEventListener("mouseenter", () => gsap.to(box, { y: -10 }));
      box.addEventListener("mouseleave", () => gsap.to(box, { y: 0 }));
    });

    if (line1Ref.current && line2Ref.current && conRef.current) {
      gsap.fromTo(
        [ line1Ref.current, line2Ref.current ],
        { strokeDasharray: "3000", strokeDashoffset: 3000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.in",
          scrollTrigger: {
            trigger: conRef.current,
            start: "top top",
            end: "top 50%",
            scrub: 1,
            // markers: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }
  }, []);

  return (
    <main ref={conRef} className="course-container">
      <article>
        {course_topic.map((topic, idx) => (
          <section className="text-top-container row" key={idx}>
            <section className="topic-container col-md-7">
                <h1 ref={topic1Ref} className="main_topic ">
                {topic.main_topic1}
                </h1>
                <h1 ref={topic2Ref} className="main_topic">
                {topic.main_topic2}
                </h1>
            </section>

            <p ref={descRef} className="sub_topic col-md-5">
              {topic.sub_topic}
            </p>
          </section>
        ))}
      </article>

      <article className="content-container">
        <svg
          className="line-wave1"
          width="1580"
          height="446"
          viewBox="0 0 1580 446"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={line1Ref}
            d="M-83 274.838C-32.489 162.712 84.8938 -31.4336 150.337 88.9907C232.142 239.521 54.8988 333.024 244.997 393.815C435.094 454.606 409.384 127.202 564.813 47.016C720.241 -33.1704 823.86 44.1212 888.524 255.732C953.189 467.343 1030.71 310.444 1108.62 178.73C1186.53 47.016 1285.86 -23.3279 1337.67 108.097C1389.48 239.521 1471.28 531.897 1562.05 393.815C1634.66 283.349 1727.6 178.73 1765 140.229"
            stroke="url(#paint0_linear_1833_575)"
            stroke-width="32"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1833_575"
              x1="-83"
              y1="223"
              x2="1765"
              y2="223"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0043C0" />
              <stop offset="1" stop-color="#521CAE" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="line-wave2"
          width="393"
          height="876"
          viewBox="0 0 393 876"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={line2Ref}
            d="M-30.129 16.3165C80.0184 41.2852 91.5872 149.521 156.446 218.801C221.305 288.082 223.676 354.22 174.09 420.424C124.504 486.628 193.393 503.342 254.51 524.104C315.627 544.865 363.047 586.228 335.233 633.454C307.419 680.681 236.977 768.198 303.376 794.73C356.495 815.955 412.993 848.738 434.602 862.476"
            stroke="url(#paint0_linear_1837_613)"
            stroke-width="32"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1837_613"
              x1="-64.4203"
              y1="-94.097"
              x2="408.734"
              y2="875.106"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0043C0" />
              <stop offset="1" stop-color="#521CAE" />
            </linearGradient>
          </defs>
        </svg>

        <section className="content-box-outter row">
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
        </section>
      </article>
    </main>
  );
};

export default Course;
