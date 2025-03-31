import React, { useEffect, useState } from "react";
import Axios from "axios";
import notFound from "../../assets/images/page-not-found.svg";

const API_URL = import.meta.env.VITE_API_URL;

const showTiktok = () => {
  // Get *Approved Showcase
  const [showTiktok, setShowcase] = useState([]);
  // console.log(showTiktok);

  const handleShowTiktok = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowTiktok/approved`, {
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
    document.title = "Showcase (Tiktok) | Comen - SPU";
    handleShowTiktok();
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="user-showtiktok-container">
      <article className="top-container">
        <h1 className="topic">Showcase (Tiktok)</h1>
        <p className="desc">
          เปิดโลกแห่งความคิดสร้างสรรค์และแรงบันดาลใจผ่านผลงานวิดีโอ TikTok
          จากเหล่านักศึกษามหาวิทยาลัยศรีปทุม!
          ที่นี่คือพื้นที่สำหรับการแสดงออกไอเดียใหม่ๆ ที่สะท้อนตัวตน ความสามารถ
          และทักษะของคนรุ่นใหม่ผ่านคลิปวิดีโอสั้นที่ทั้งสนุก น่าสนใจ
          และเต็มไปด้วยความคิดสร้างสรรค์
        </p>
      </article>

      {showTiktok.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="svg-not-found" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {showTiktok.map((showTiktokItem, idx) => (
            <section className="content-card-container col-sm-12 col-md-4">
              <section className="content-card">
                <section
                  className="content-tiktok"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: showTiktokItem.embed }}
                />
                <section className="text-container">
                  <p className="id">{showTiktokItem.studentID}</p>
                  <h1 className="topic">{showTiktokItem.topic}</h1>
                </section>
              </section>
            </section>
          ))}
        </article>
      )}
    </main>
  );
};

export default showTiktok;
