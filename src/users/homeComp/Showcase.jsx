import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import Orb from "../components/Orb";
import Particles from "../components/Particles";
import SplitText from "../components/SplitText";

import "swiper/scss";
import "swiper/scss/pagination";

const Showcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showcases_info = [
    { topic: "Our Showcase" },
    {
      description:
        "มาม่าผลไม้สะบึมดั๊มพ์ พุดดิ้งโต๊ะจีน คอนเฟิร์มสตาร์แซ็กเรตเชอร์รี่ เวเฟอร์ สเปก เลดี้ซีรีส์โทรโข่งแมชีนเป่า",
    },
    {
      moreshow:
        "https://www.google.com/"
    },
  ];

  const showcases_details = [
    {
      topic: 'ex. topic #1',
      description:
        "It is a long established fact that a reader will be distracted by the readable",
      link: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ </section> </blockquote>',
      members: ["aaaa aaaa", "bbb bbb", "ccc ccc"],
    },
    {
      topic: 'ex. topic #2',
      description:
        "There are many variations of passages of Lorem Ipsum available, ",
      link: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@bunniebinie/video/7477156937201782024" data-video-id="7477156937201782024" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@bunniebinie" href="https://www.tiktok.com/@bunniebinie?refer=embed">@bunniebinie</a> </section> </blockquote>',
      members: ["aaa aaa"],
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showcases_details]);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <main className="showcase-container">
      <article className="text-top-container">
        {showcases_info.map((info, idx) => (
          <section className="text-top" key={idx}>
            <h1 className="topic">
              <SplitText
                text={info.topic}
                delay={50}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,100px,0)",
                }}
                animationTo={{
                  opacity: 1,
                  transform: "translate3d(0, 70px, 0)",
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
      </article>

      <article className="content-container row m-0">
        <section className="content-left-side">
          <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 3500, disableOnInteraction: false
          }}
          pagination={true}
          modules={[Pagination, Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="swiper"
          >
            {showcases_details.map((detail, idx) => (
              <SwiperSlide>
                <section
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: detail.link }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <section className="link-container">
            <a 
              href={showcases_info[2]?.moreshow}
              target="_blank" 
              rel="noopener noreferrer"
            >
              MORE SHOWCASE
            </a>
          </section>


        </section>
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
      <Orb
        hue={250}
        hoverIntensity={0}
        rotateOnHover={false}
        forceHoverState={true}
      />
    </main>
  );
};

export default Showcase;
