import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/effect-coverflow";
import "swiper/scss/pagination";

const sanitizeEmbedCode = (html) => {
  return html
    .replace(/style="[^"]*"/g, "")
    .replace(/<script.*?<\/script>/g, "");
};

// Forwarding ref to the div inside TiktokEmbed
const TiktokEmbed = React.forwardRef(({ embedHtml }, ref) => {
  useEffect(() => {
    const oldScript = document.querySelector(
      'script[src="https://www.tiktok.com/embed.js"]'
    );
    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: sanitizeEmbedCode(embedHtml) }}
    />
  );
});

const Showcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcases = [
    {
      description: 'It is a long established fact that a reader will be distracted by the readable',
      link: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ <a title="spu" target="_blank" href="https://www.tiktok.com/tag/spu?refer=embed">#spu</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a target="_blank" title="♬ original sound - sp99d.s0ngs" href="https://www.tiktok.com/music/original-sound-7071809975861005099?refer=embed">♬ original sound - sp99d.s0ngs</a> </section> </blockquote>',
      member: ['aaaa aaaa', 'bbb bbb', 'ccc ccc'],
    },
    {
      description: 'There are many variations of passages of Lorem Ipsum available, ',
      link: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@bunniebinie/video/7477156937201782024" data-video-id="7477156937201782024" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@bunniebinie" href="https://www.tiktok.com/@bunniebinie?refer=embed">@bunniebinie</a> <a title="cpe" target="_blank" href="https://www.tiktok.com/tag/cpe?refer=embed">#CPE</a> <a title="it_spu" target="_blank" href="https://www.tiktok.com/tag/it_spu?refer=embed">#it_spu</a> <a title="spu" target="_blank" href="https://www.tiktok.com/tag/spu?refer=embed">#spu</a> <a target="_blank" title="♬ original sound - Hellomello - Hellomellooo" href="https://www.tiktok.com/music/original-sound-Hellomello-7477157015078308624?refer=embed">♬ original sound - Hellomello - Hellomellooo</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
      member: ['aaa aaa']
    },
  ];

  return (
    <main className="showcase-container">
      <article className="content-container row m-0">
        {/* คอลัมน์ซ้าย */}
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

        {/* คอลัมน์ขวา (Swiper) */}
        <section className="col-md-6 right-side">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{
              delay: 5500,
              disableOnInteraction: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0,
              slideShadows: false,
            }}
            onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
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
    </main>
  );
};

export default Showcase;
