import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Highlight = () => {
  const conRef = useRef(null);
  const topicRef = useRef(null);
  const descRef = useRef(null);

  const highlights = [
    {
      type: "จุดเด่นของสาขา",
      topic: "ความรู้ด้านเทคโนโลยีสารสนเทศและภาคปฏิบัติควบคู่กันไป",
      description:
        "สาขาวิชาวิศวกรรมคอมพิวเตอร์ที่มหาวิทยาลัยศรีปทุมมุ่งเน้นการเรียนรู้จากโจทย์จริงและการปฏิบัติที่สถานประกอบการจริงในการนำเอาเทคโนโลยี AIoT ไปใช้ ทำให้นักศึกษาได้รับประสบการณ์และความเชี่ยวชาญในการประยุกต์ใช้เทคโนโลยีในสถานการณ์จริง เพื่อเตรียมพร้อมให้กับการทำงานในอุตสาหกรรม 4.0 และส่งเสริมการพัฒนาเทคโนโลยีและอุตสาหกรรมให้ก้าวหน้าไปด้วยกันได้อย่างยั่งยืนในอนาคต",
      sub1: "ปีที่ก่อตั้ง",
      sub2: "จำนวนนักศึกษา",
      sub1_num: 2002,
      sub2_num: 1100,
    },
  ];

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: conRef.current,
          start: "top bottom",
          end: "bottom bottom",
          // markers: true,
          scrub: 1,
          ease: "power2.inOut",
        },
      })
      .fromTo(topicRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
      // .fromTo(descRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1 });
  }, []);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <main ref={conRef} className="highlight-container">
    <div className="hr"></div>
      {highlights.map((highlight, idx) => (
        <article key={idx} className="highlight-box">
            <section className="topic-container">
              <h1 ref={topicRef} className="topic">
                {highlight.topic}
              </h1>
            </section>

            <section className="desc-container">
              <p ref={descRef} className="desc">
                {highlight.description}
              </p>
            </section>

            <span className="box-type">
              <h5 className="hashtag">#</h5>
              <h5 className="type">{highlight.type}</h5>
            </span>
        </article>
      ))}
    </main>
  );
};

export default Highlight;
