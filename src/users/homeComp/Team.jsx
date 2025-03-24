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

  const team_detail = [
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

  const teams_info = [
    {
      topic: "Our Team",
      description:
        "It is a long established fact that a reader will be distracted by the readable",
    },
  ];

  return (
    <main ref={conRef} className="team-container">
        {teams_info.map((info, idx) => (
          <section key={idx} className="text-top-container">
            <h1 className="topic">{info.topic}</h1>
            <p className="desc">{info.description}</p>
          </section>
        ))}

        <article className="content-container row">
          {team_detail.map((detail, idx) => (
            <section
              ref={(el) => (imgRefs.current[idx] = el)}
              key={idx}
              className="col-md-3"
            >
              <section className="content-box">
                <img src={detail.img} alt={detail.fname} />
                <section className="text-bottom-container">
                  <h1 className="name fname">{detail.fname}</h1>
                  <h1 className="name lname">{detail.lname}</h1>
                  <p className="position">{detail.position}</p>
                </section>
              </section>
            </section>
          ))}
        </article>
    </main>
  );
};

export default Team;
