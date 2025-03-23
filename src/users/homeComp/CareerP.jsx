import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import SpotlightCard from "../../components/SpotlightCard"

const CareerP = () => {
  const conRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const career_info = [
    {
      topic: "Career Path.",
      description:
        "พุทโธแซมบ้า พาสต้า ฮาโลวีนฟลุค กีวีความหมายสันทนา การทัวร์นาเมนท์ ราชบัณฑิตยสถาน",
    },
  ];
  const career_detail = [
    {
      icon: "hardware-chip-outline",
      topic: "ex topic #1",
      desc: "ทงกั๊กซูฮก ซิตีโง่เขลาลาเต้ ฟีดเสกสรรค์คอร์ปซีน วิกเทรนด์พันธุวิศวกรรมบรา โยเกิร์ตฉลุย ",
    },
    {
      icon: "share-social-outline",
      topic: "ex topic #2",
      desc: "คอนแทคเทคโนแครต ซูเปอร์เอาท์ป๋อหลอจุ๊ยฮาลาล มะกัน ฟยอร์ดทำงาน แชมปิยองอีโรติก",
    },
    {
      icon: "server-outline",
      topic: "ex topic #3",
      desc: "ช็อปเปอร์โบรชัวร์กรีนเยอร์บีร่า เพลซสต็อคไนน์เย้ว เทคโนห่วยท็อปบูตเซาท์ โบกี้พาวเวอร์เซี้ยวดีลเลอร์ผู้นำ ",
    },
  ];

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: conRef.current,
            start: "top top",
            end: "top 50%",
            // markers: true,
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <main ref={conRef} className="careerP-container">
      {career_info.map((info, idx) => (
        <section key={idx} className="text-container">
          <h1 className="topic">{info.topic}</h1>
          <p className="desc">{info.description}</p>
        </section>
      ))}

      {isMobile ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
          }}
          initialSlide={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 0,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {career_detail.map((detail, idx) => (
            <SwiperSlide key={idx} className="col-md-4">
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                <ion-icon name={detail.icon}></ion-icon>
                <h1 className="topic">{detail.topic}</h1>
                <p className="desc">{detail.desc}</p>
              </SpotlightCard>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="content-container row">
          {career_detail.map((detail, idx) => (
            <div 
              ref={el => cardRefs.current[idx] = el}
              key={idx} 
              className="col-md-4"
            >
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                <ion-icon name={detail.icon}></ion-icon>
                <h1 className="topic">{detail.topic}</h1>
                <p className="desc">{detail.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CareerP;
