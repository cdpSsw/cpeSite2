import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import Hyperspeed from "../components/Hyperspeed";
import SplitText from "../components/SplitText";
import DecryptedText from "../components/DecryptedText";

const Header = () => {
  const lineRef = useRef(null);
  const starRef = useRef(null);
  const headers = [
    {
      titleTH: "{ วิศวกรรมคอมพิวเตอร์ }",
      titleEN1: "COMPUTER",
      titleEN2: "ENGINEERING",
      description:
        "It is a long established fact that a reader will be distracted by the readable",
    },
  ];

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    const lineTL = gsap.timeline();
    lineTL.fromTo(
      lineRef.current,
      { strokeDasharray: 350, strokeDashoffset: 500 },
      { strokeDashoffset: 0, duration: 0.6 }
    );

    lineTL.fromTo(
      lineRef.current,
      { strokeDasharray: 0 },
      { strokeDashoffset: 500, strokeDasharray: 420, duration: 0.6 },
      "+=3"
    );

    const starTL = gsap.timeline();
    starTL.fromTo(
      starRef.current,
      { scale: 0, rotateZ: -360 },
      { scale: 1, rotateZ: 0, duration: 3, ease: "elastic.out" }
    );

    starTL.fromTo(
      starRef.current,
      { scale: 1, rotate: 0 },
      { scale: 0, rotate: 360, duration: 2, ease: "elastic.inOut" },
      "+=1"
    );
  }, []);

  return (
    <main className="header-container">
      <article className="header-content">
        {headers.map((header, idx) => (
          <>
            <section className="btn-container">
              <button className="btn apply-to-study-btn">สมัครเรียน</button>
              <button className="btn scholarship-btn">ทุนการศึกษา</button>
            </section>
            <section className="text-container" key={idx}>
              <h1 className="title title-TH">{header.titleTH}</h1>
              <h1 className="title title-EN">
                {/* <SplitText
                  text={header.titleEN1}
                  className="text-2xl font-semibold text-center"
                  delay={150}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={handleAnimationComplete}
                /> */}

                <DecryptedText
                  text={header.titleEN1}
                  animateOn="view"
                  speed={60}
                  maxIterations={25}
                  characters=";?e2e9-0adpw,wd/D;,w;ppfkw"
                  revealDirection="center"
                />

                {/* <section className="asstes-container">
                  <svg
                    className="assets assets-1"
                    width="141"
                    height="86"
                    viewBox="0 0 141 86"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={lineRef}
                      d="M4.00095 66.863C22.484 42.958 42.4824 3.86641 83.8719 34.022C120.949 61.0357 65.9872 105.456 42.1512 64.9308C21.3468 29.5596 104.699 7.46312 140.468 4.10293"
                      stroke="#0043C0"
                      stroke-width="8"
                    />
                  </svg>

                  <img ref={starRef} className="assets assets-2" src={star} />
                </section> */}
              </h1>
              <h1 className="title title-EN">
                <DecryptedText
                  text={header.titleEN2}
                  animateOn="view"
                  speed={60}
                  maxIterations={25}
                  characters=";?e2e9-0adpw,wd/D;,w;ppfkw"
                  revealDirection="center"
                />
              </h1>
              <section className="desc-container">
                <p className="desc">{header.description}</p>
              </section>
            </section>
          </>
        ))}
      </article>

      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => {},
          onSlowDown: () => {},
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xffffff,
            brokenLines: 0xffffff,
            leftCars: [0xb21010, 0xb21010, 0xb21010],
            rightCars: [0xffffff, 0xb21010, 0xffffff],
            sticks: 0xb21010,
          },
        }}
      />
    </main>
  );
};

export default Header;
