import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/effect-coverflow";
import "swiper/scss/pagination";

const TiktokEmbed = ({ embedHtml }) => {
  const embedRef = useRef(null);

  useEffect(() => {
    if (window.tiktokEmbedLoad) {
      window.tiktokEmbedLoad();
    }
  }, [embedHtml]);

  return <div ref={embedRef} dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

const Showcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcases = [
    {
      description: "It is a long established fact that a reader will be distracted by the readable",
      link: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ </section> </blockquote>',
      member: ["aaaa aaaa", "bbb bbb", "ccc ccc"],
    },
    {
      description: "There are many variations of passages of Lorem Ipsum available, ",
      link: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@bunniebinie/video/7477156937201782024" data-video-id="7477156937201782024" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@bunniebinie" href="https://www.tiktok.com/@bunniebinie?refer=embed">@bunniebinie</a> </section> </blockquote>',
      member: ["aaa aaa"],
    },
  ];

  return (
    <main className="showcase-container">
      <article className="content-container row m-0">
        <section className="col-md-6 left-side">
          <h1 className="topic">Our Showcase</h1>
          {showcases.map((showcase, idx) => (
            activeIndex === idx ? (
              <>
                <h3 className="desc">{showcase.description}</h3>
                <ol>
                  {showcase.member.map((member, memberIdx) => (
                    <li key={memberIdx} className="member">{member}</li>
                  ))}
                </ol>
              </>
            ) : null
          ))}
          <hr />
          <a href="" className="more-link">MORE SHOWCASE</a>
        </section>

        <section className="col-md-6 right-side">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{ delay: 5500, disableOnInteraction: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0,
              slideShadows: false,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {showcases.map((showcase, idx) => (
              <SwiperSlide key={idx} className="clip-box">
                <TiktokEmbed embedHtml={showcase.link} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </article>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </main>
  );
};

export default Showcase;
