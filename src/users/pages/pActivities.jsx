import React, { useState } from "react";

import Nav from "../components/Nav";
import PagesHeader from "../components/PagesHeader";

import ev1 from '/public/exposter/ev1.png'
import ev2 from '/public/exposter/ev2.png'
import ev3 from '/public/exposter/ev3.png'
import sc1 from '/public/exposter/sc1.png'
import sc2 from '/public/exposter/sc2.png'
import sc3 from '/public/exposter/sc3.png'

const pActivities = () => {
  const activities_info = [
    {
      title: "Activitie",
      topic: "Contact Details",
    },
  ];

  const activities = [
    { topic: 'topic #1', description: 'Desription supp topic', poster: ev1 },
    { topic: 'topic #2', description: 'Desription supp topic', poster: ev2 },
    { topic: 'topic #3', description: 'Desription supp topic', poster: ev3 },
    { topic: 'topic #4', description: 'Desription supp topic', poster: sc1 },
    { topic: 'topic #5', description: 'Desription supp topic', poster: sc2 },
    { topic: 'topic #6', description: 'Desription supp topic Desription supp topic', poster: sc3 },
  ]

  return (
    <main className="p-activities-container">
      <Nav />
      <PagesHeader
        main_title={activities_info[0].title}
        sub_title={activities_info[0].title}
      />

      <article className="content-container row">
        {activities.map((activity, idx) => (
            <section key={idx} className="flip col-md-3">
                <section className="front">
                    <img 
                        src={activity.poster} 
                        alt={activity.topic} 
                        className="poster"
                    />
                </section>

                <section className="back">
                    <p className="topic">{activity.topic}</p>
                    <p className="desc">{activity.description}</p>
                </section>
            </section>
        ))}
      </article>
    </main>
  );
};

export default pActivities;
