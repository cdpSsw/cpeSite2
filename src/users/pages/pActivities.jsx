import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

import PagesHeader from "../components/PagesHeader";

import ev1 from "../../assets/images/ev1.png";
import ev2 from "../../assets/images/ev2.png";
import ev3 from "../../assets/images/ev3.png";
import sc1 from "../../assets/images/sc1.png";
import sc2 from "../../assets/images/sc2.png";
import sc3 from "../../assets/images/sc3.png";

const pActivities = () => {
  // const activities_info = [
  //   {
  //     title: "Activitie",
  //     topic: "Contact Details",
  //   },
  // ];

  // const activities = [
  //   { topic: 'topic #1', description: 'Desription supp topic', poster: ev1 },
  //   { topic: 'topic #2', description: 'Desription supp topic', poster: ev2 },
  //   { topic: 'topic #3', description: 'Desription supp topic', poster: ev3 },
  //   { topic: 'topic #4', description: 'Desription supp topic', poster: sc1 },
  //   { topic: 'topic #5', description: 'Desription supp topic', poster: sc2 },
  //   { topic: 'topic #6', description: 'Desription supp topic Desription supp topic', poster: sc3 },
  // ]

  // Get *Showcase
  const [showcase, setShowcase] = useState([]);
  // console.log(showcase);
  const handleShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase`);
      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  useEffect(() => {
    handleShowcase();
  }, []);

  return (
    <main className="p-activities-container">
      {/* <PagesHeader
        main_title={activities_info[0].title}
        sub_title={activities_info[0].title}
      /> */}

      <article className="content-container row">
        {showcase.map((showcaseItem, idx) =>
          showcaseItem.status === "Approved" ? (
            <section key={idx} className="flip col-md-3">
              <section className="front">
                <img
                  src={`${API_URL}/images/stu_showcase/${showcaseItem.image}`}
                  alt={showcaseItem.topic}
                  className="poster"
                />
              </section>

              <section className="back">
                <p className="topic">{showcaseItem.topic}</p>
                <p className="desc">{showcaseItem.description}</p>
              </section>
            </section>
          ) : null
        )}
      </article>
    </main>
  );
};

export default pActivities;
