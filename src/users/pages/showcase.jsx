import React, { useEffect, useState } from "react";
import Axios from "axios";
import notFound from "../../assets/images/page-not-found.svg";

const API_URL = import.meta.env.VITE_API_URL;

const showcase = () => {
  // Get *Approved Showcase
  const [showcase, setShowcase] = useState([]);
  // console.log(showcase);

  const handleShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase/approved`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Get Approved Showcase failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Files) | Comen - SPU";
    handleShowcase();
  }, []);

  return (
    <main className="user-showcase-container">
      <article className="top-container">
        <h1 className="topic">Showcase (Files)</h1>
        <p className="desc">
          เวทีแสดงศักยภาพ ความคิดสร้างสรรค์
          และผลงานสุดโดดเด่นจากนักศึกษามหาวิทยาลัยศรีปทุม
          ที่นี่คือพื้นที่สำหรับการนำเสนอไอเดีย แรงบันดาลใจ
          และความสามารถของนักศึกษาผ่านผลงานที่หลากหลาย
        </p>
      </article>

      {showcase.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="svg-not-found" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {showcase.map((showcaseItem, idx) => (
            <section key={idx} className="content-card-container col-md-3">
              {/* Card ที่มี hover effect */}
              <section className="content-card-1 ih-item square effect3 bottom_to_top">
                <img
                  src={`${API_URL}/images/stu_showcase/${showcaseItem.image}`}
                  alt={showcaseItem.topic}
                  className="content-img"
                />
                {/* กล่องข้อมูลที่จะเลื่อนขึ้นมา */}
                <div className="info">
                  <h3>{showcaseItem.topic}</h3>
                  <p>{showcaseItem.description}</p>
                </div>
              </section>
            </section>
          ))}
        </article>
      )}
    </main>
  );
};

export default showcase;
