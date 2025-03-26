import React, { useEffect, useRef, useState } from "react";
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

import ev1 from "/public/users/home-assets/exposter/ev1.png";
import ev2 from "/public/users/home-assets/exposter/ev2.png";
import ev3 from "/public/users/home-assets/exposter/130.png";

const Activities = () => {
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

  const activities_info = [
    { topic: "Our Activities" },
    {
      desc: "It is a long established fact that a reader will be distracted by the readable",
    },
  ];

  const activities = [
    {
      topic: "ex poster #1",
      description: "ex. first description",
      poster: ev1,
    },
    {
      topic: "ex poster #2",
      description: "ex. second description",
      poster: ev2,
    },
    {
      topic: "ex poster #3",
      description: "ex. third description",
      poster: ev3,
    },
  ];

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
    <main ref={conRef} className="activities-container d-flex">
      {isMobile ? (
        <article className="mobile-view">
          <section className="content-container">
            <section className="text-top-container">
              <section className="text-top-left">
                {activities_info.map((info, idx) => (
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
              {activities.map((activity, idx) => (
                <SwiperSlide key={idx}>
                  <section className="content-swiper">
                    <img
                      ref={(el) => (imgRefs.current[idx] = el)}
                      src={activity.poster}
                      alt={activity.topic}
                      onClick={() => setSelectedImg(activity.poster)}
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
                {activities_info.map((info, idx) => (
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
              {activities.map((activity, idx) => (
                <SwiperSlide key={idx}>
                  <section className="content-swiper">
                    <img
                      ref={(el) => (imgRefs.current[idx] = el)}
                      src={activity.poster}
                      alt={activity.topic}
                      onClick={() => setSelectedImg(activity.poster)}
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
              src={selectedImg}
              alt="Original Image"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Activities;
