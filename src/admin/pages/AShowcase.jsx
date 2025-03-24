import React, { useEffect, useState } from "react";
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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

const AShowcase = () => {
  // ,,, get
  const [allShowcase, setAllShowcase] = useState([]);
  console.log(allShowcase);

  // ,,, post & preview

  const [sc_name, setScName] = useState("");
  const [sc_link, setScLink] = useState("");
  //   console.log(`sc_name: ${sc_name}`)
  //   console.log(`sc_link: ${sc_link}`)

  const handleGet = async () => {
    try {
      const res = await Axios.get(`${API_URL}/showcase`);
      const updateData = res.data.map((item) => ({
        ...item,
        formattedDate: handleDate(item.updated),
      }));

      setAllShowcase(updateData);
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  const handleDate = (date) => {
    if (!date) return "No date";

    const oldDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(oldDate);

    return formattedDate.replace(" ", ", ");
  };

  const handleAddNew = async () => {
    try {
      const newShowcase = {
        sc_name: sc_name.trim(),
        sc_link: sc_link.trim(),
      };
      // console.log("Sending data:", newShowcase);

      const res = await Axios.post(`${API_URL}/showcase`, newShowcase, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res.status);
      if (res.status === 200) {
        alert(`Insert New Showcase Successfully`);
        location.reload();
        setScName("");
        setScLink("");
      } else {
        alert(`Insert New Showcase Failed, try again...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}, ${res}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`${API_URL}/newsEvent/${id}`);
      if (res.status === 200) {
        alert(`Delete Successful`);

        // 🔥 อัปเดตรายการข่าวใหม่
        fetchNews();
      } else {
        alert(`Delete Error, try again ...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // ,,, post select
  // const [newsSelected, setNewsSelected] = useState([]); // ข่าวที่โหลดจาก API
  // const [newNewsSelected, setNewNewsSelected] = useState([]); // ข่าวที่ผู้ใช้เลือกใหม่
  // // console.log(newNewsSelected);

  // const handleGetSelected = async () => {
  //   try {
  //     const res = await Axios.get(`${API_URL}/newsEventSelected`);
  //     setNewsSelected(res.data);
  //     setNewNewsSelected(res.data);
  //   } catch (err) {
  //     alert(`Internal server error: ${err}`);
  //   }
  // };

  // const handleNewSelect = (newsSelect) => {
  //   setNewNewsSelected((prev) => {
  //     const isSelected = prev.some((item) => item.poster === newsSelect.poster);

  //     if (isSelected) {
  //       // ถ้าเลือกซ้ำ ให้เอาออก
  //       return prev.filter((item) => item.poster !== newsSelect.poster);
  //     } else {
  //       // ถ้าเลือกครบ 5 แล้ว แจ้งเตือน
  //       if (prev.length >= 5) {
  //         alert("Please select only 5 News & Event for show");
  //         return prev;
  //       }
  //       return [...prev, newsSelect]; // เพิ่มข่าวเข้าไป
  //     }
  //   });
  // };

  // const addNewSelected = async () => {
  //   if (!Array.isArray(newNewsSelected) || newNewsSelected.length === 0) {
  //     alert("No news selected to save.");
  //     return;
  //   }

  //   if (newNewsSelected.length !== 5) {
  //     alert(`Please select 5 News & Event`);
  //     return;
  //   }

  //   try {
  //     // console.log("Sending data:", newNewsSelected);

  //     const res = await Axios.post(
  //       `${API_URL}/newsEventSelected`,
  //       newNewsSelected
  //     );
  //     if (res.status === 200) {
  //       location.reload();
  //     } else {
  //       alert(`Insert Failed, try again...`);
  //     }
  //   } catch (err) {
  //     alert(`Internal server error: ${err}`);
  //   }
  // };

  useEffect(() => {
    handleGet();
    // handleGetSelected();
  }, []);

  return (
    <main className="p-sc-container row m-0">
      <section className="show-sc-container col-sm-11 row">
        <h1 className="title">
          Edit Showcase
          <hr className="mt-3" />
        </h1>
        {/* <button onClick={addNewSelected}>save select</button> */}

        {allShowcase.map((sc, idx) => (
          <section key={idx} className="cards-sc">
            <h1 className="sc-name">
                {sc.sc_name}
                <button 
                    className="btn-preview"
                >
                    <ion-icon name="eye"></ion-icon>
                </button>
            </h1>
            <h1 className="sc-updated">{sc.formattedDate}</h1>
            <TiktokEmbed embedHtml={sc.sc_link} />
          </section>
        ))}
      </section>

      <section className="form-news-container col-md-4">
        <div className="line-ver"></div>
        <form>
          <h1 className="form-title">Add New</h1>
          <hr />

          <div className="form-box">
            <label htmlFor="topic" className="form-label">
              * Tiktok name
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              className="form-control mb-3"
              placeholder="ex. form-topic"
              onChange={(e) => setScName(e.target.value)}
            />
          </div>

          <div className="form-box">
            <label htmlFor="newsDesc" className="form-label">
              *Embed link
            </label>
            <textarea
              type="text"
              name="newsDesc"
              id="newsDesc"
              className="form-control mb-3"
              placeholder="type news description"
              onChange={(e) => setScLink(e.target.value)}
            ></textarea>
          </div>

          <section className="tiktok-preview">
            <TiktokEmbed embedHtml={sc_link} />
          </section>

          <section className="btn-container">
            <button
              type="button"
              onClick={handleAddNew}
              disabled={!sc_name?.trim() || !sc_link?.trim()}
            >
              Add New
            </button>
          </section>
        </form>
      </section>


    </main>
  );
};

export default AShowcase;
