import React, { use, useEffect, useRef, useState } from "react";
import Axios from 'axios'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";

import SplitText from "../components/SplitText";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/scss/effect-coverflow";

import ev1 from "../../assets/images/ev1.png";
import ev2 from "../../assets/images/ev2.png";
import ev3 from "../../assets/images/ev3.png";

const API_URL = import.meta.env.VITE_API_URL;

const Showcase = () => {
  const conRef = useRef(null);
  const imgRefs = useRef([]);
  const text1Refs = useRef([]);
  const text2Refs = useRef([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  const [activeIndex, setActiveIndex] = useState(1);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Showcase_info = [
    { topic: "Our Showcase" },
    {
      desc: "เวทีแสดงศักยภาพ ความคิดสร้างสรรค์ และผลงานสุดโดดเด่นจากนักศึกษามหาวิทยาลัยศรีปทุม ที่นี่คือพื้นที่สำหรับการนำเสนอไอเดีย แรงบันดาลใจ และความสามารถของนักศึกษาผ่านผลงานที่หลากหลาย",
    },
  ];

  // const Showcase = [
  //   {
  //     topic: "ex image #1",
  //     description: "ex. first description",
  //     image: ev1,
  //   },
  //   {
  //     topic: "ex image #2",
  //     description: "ex. second description",
  //     image: ev2,
  //   },
  //   {
  //     topic: "ex image #3",
  //     description: "ex. third description",
  //     image: ev3,
  //   },
  // ];
  const [Showcase, setShowcase] = useState([]);
  const handleShowcase = async () => {
    try{
      const res = await Axios.get(`${API_URL}/selectedShowcase`);
      if(res.status === 200){
        setShowcase(res.data);
      } else {
        alert(`Getting Showcase failed.`)
      }
    } catch(err){
      alert(`Internal server error: ${err.message}`);
    }
  }

  useEffect(() => { handleShowcase() }, [])

  useEffect(() => {
    imgRefs.current.forEach((img, idx) => {
      gsap.to(img, {
        scale: idx === activeIndex ? 1 : 0.8,
        filter: idx === activeIndex ? "grayscale(0)" : "grayscale(100%)",
        duration: 0.3,
      });

      gsap.to(text1Refs.current[idx], {
        opacity: idx === activeIndex ? 1 : 1,
        y: idx === activeIndex ? 0 : 100,
        duration: 0.6,
        ease: "power2.inOut",
      });

      gsap.to(text2Refs.current[idx], {
        opacity: idx === activeIndex ? 1 : 1,
        y: idx === activeIndex ? 0 : -100,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });
  }, [activeIndex]);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <main ref={conRef} className="Showcase-container d-flex">
      {isMobile ? (
        <article className="mobile-view">
          <section className="content-container">
            <section className="text-top-container">
              <section className="text-top-left">
                {Showcase_info.map((info, idx) => (
                  <section className="text-top-box" key={idx}>
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
                          transform: "translate3d(0,50px,0)",
                        }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-20px"
                        onLetterAnimationComplete={handleAnimationComplete}
                      />
                    </h1>
                    <p className="desc">{info.desc}</p>
                  </section>
                ))}
              </section>

              <section className="text-top-right">
                <button ref={prevRef} className="btn-prev">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
                <button ref={nextRef} className="btn-next">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
              </section>
            </section>

            <Swiper
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              initialSlide={1}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={true}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              modules={[Autoplay, Pagination]}
              className="swiper-mobile"
            >
              {Showcase.map((activity, idx) => (
                <SwiperSlide key={idx}>
                  <section className="content-swiper">
                    <img
                      ref={(el) => (imgRefs.current[idx] = el)}
                      src={`${API_URL}/images/stu_showcase/${activity.image}`}
                      alt={activity.topic}
                      onClick={() => setSelectedImg(activity.image)}
                    />
                    <section className="text-container">
                      <section className="topic-container">
                        <h1
                          ref={(el) => (text1Refs.current[idx] = el)}
                          className="topic"
                        >
                          {activity.topic}
                        </h1>
                      </section>

                      <section className="desc-container">
                        <p
                          ref={(el) => (text2Refs.current[idx] = el)}
                          className="desc"
                        >
                          {activity.description}
                        </p>
                      </section>
                    </section>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </article>
      ) : (
        <article className="desktop-view">
          <section className="content-container">
            <section className="text-top-container">
              <section className="text-top-left">
                {Showcase_info.map((info, idx) => (
                  <section className="text-top-box" key={idx}>
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
                          transform: "translate3d(0,50px,0)",
                        }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-20px"
                        onLetterAnimationComplete={handleAnimationComplete}
                      />
                    </h1>
                    <p className="desc">{info.desc}</p>
                  </section>
                ))}
              </section>

              <section className="text-top-right">
                <button ref={prevRef} className="btn-prev">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
                <button ref={nextRef} className="btn-next">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
              </section>
            </section>

            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              initialSlide={1}
              autoplay={{ delay: 5500, disableOnInteraction: false }}
              coverflowEffect={{
                rotate: -30,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="swiper-desktop"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {Showcase.map((activity, idx) => (
                <SwiperSlide key={idx}>
                  <section className="content-swiper">
                    <img
                      ref={(el) => (imgRefs.current[idx] = el)}
                      // src={activity.image}
                      src={`${API_URL}/images/stu_showcase/${activity.image}`}
                      alt={activity.topic}
                      onClick={() => setSelectedImg(activity.image)}
                    />
                    <section className="text-container">
                      <section className="topic-container">
                        <h1
                          ref={(el) => (text1Refs.current[idx] = el)}
                          className="topic"
                        >
                          {activity.topic}
                        </h1>
                      </section>

                      <section className="desc-container">
                        <p
                          ref={(el) => (text2Refs.current[idx] = el)}
                          className="desc"
                        >
                          {activity.description}
                        </p>
                      </section>
                    </section>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </article>
      )}

      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <img
              src={`${API_URL}/images/stu_showcase/${selectedImg}`}
              alt="Original Image"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Showcase;
