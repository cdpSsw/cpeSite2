import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import j from "/public/users/home-assets/person/j.png";
import b from "/public/users/home-assets/person/b.png";
import n from "/public/users/home-assets/person/n.png";

const Team = () => {
  const conRef = useRef(null);
  const imgRefs = useRef([]);

  const team_info = [
    {
      img: j,
      fname: "CHIROT",
      lname: "CHARITKHUAN",
      position: "Full-time teacher",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
    {
      img: b,
      fname: "SURACHAI",
      lname: "THONGKAEW",
      position: "Full-time teacher",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
    {
      img: n,
      fname: "NIMIT",
      lname: "TUKSAVITAYAPONG",
      position: "Full-time teacher",
      tel: "099-999-9999",
      email: "exam.ple@spumail.net",
      location: "Building 5, Floor 8, Computer Engineering Room",
      date_time: "09:00 - 17:00 ( Mon - Fri )",
    },
  ];

  useEffect(() => {
    imgRefs.current.forEach((img) => {
      gsap.fromTo(
        img,
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
    <main ref={conRef} className="team-container">
      <article className="team-box-outer row">
        {team_info.map((info, idx) => (
          <section 
            ref={(el) => (imgRefs.current[idx] = el)}
            key={idx} 
            className="flip col-md-4"
          >
            <section key={idx} className="team-card front">
              <img
                src={info.img}
                alt={info.fname}
              />
            </section>
            <section className="team-card back">
              <h1 className="name">{info.fname}</h1>
              <h1 className="name">{info.lname}</h1>
              <h3 className="position">{info.position}</h3>
              <hr />
              <span className="detail-container">
                <ion-icon name="call"></ion-icon>
                <p className="detail">{info.tel}</p>
              </span>
              <span className="detail-container">
                <ion-icon name="mail"></ion-icon>
                <p className="detail">{info.email}</p>
              </span>
              <span className="detail-container location">
                <ion-icon name="navigate-circle"></ion-icon>
                <p className="detail">{info.location}</p>
              </span>
              <span className="detail-container">
                <ion-icon name="calendar-clear"></ion-icon>
                <p className="detail">{info.date_time}</p>
              </span>
              <span className="detail-container img">
                <img src={info.img} alt={info.fname} />
              </span>
            </section>

            <section className="text-container">
              <h1 className="name fname">{info.fname}</h1>
              <h1 className="name lname">{info.lname}</h1>
              <p className="position">{info.position}</p>
            </section>
          </section>
        ))}
      </article>
    </main>
  );
};

export default Team;
