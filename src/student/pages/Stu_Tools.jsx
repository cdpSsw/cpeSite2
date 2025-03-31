import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/pagination";

import Modal from "../../components/Modal";

const API_URL = import.meta.env.VITE_API_URL;

const Stu_Tools = ({ id }) => {
  // all tools
  const [tools, setTools] = useState([]);
  // console.log(tools);

  const handleTools = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tools`);
      if (res.status === 200) {
        setTools(res.data);
      } else {
        alert(`Getting *tools failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  useEffect(() => {
    handleTools();
  }, []);

  const [selectedImg, setSelectedImg] = useState(null);
  // ------------------------------------ ยืม ------------------------------------
  const generateBorrowCode = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const randomNum = Math.floor(Math.random() * 10000); // สุ่มตัวเลข 4 หลัก
    return `BORROW-${dateString}-${randomNum}`;
  };

  const [borrowCode, setBorrowCode] = useState(generateBorrowCode);
  const [studentID, setStudentID] = useState(id);
  const [borrwCount, setBorrowCount] = useState("");
  const [toolName, setToolName] = useState();
  const [toolID, setToolID] = useState();
  const [imgsBefore, setImgsBefore] = useState([]);
  const [previewBefore, setPreviewBefore] = useState([]);
  // set imgs:before
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImgsBefore([...files]);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewBefore([...previewUrls]);
  };

  const handleBorrow = async () => {
    try {
      const count = Number(borrwCount);

      if (isNaN(count) || count < 0) {
        alert(`Please enter a valid borrow count`);
        return;
      }

      const res = await Axios.put(`${API_URL}/tools/borrow/${toolID}`, {
        borrowCount: count,
      });

      if (res.status === 200) {
        alert("Borrowed successfully");
        location.reload();
      } else {
        alert("Failed to borrow the tool.");
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  return (
    <main className="stu-tools-container">
      <article className="content-container row m-0">
        {tools.map((tool, idx) => (
          <section key={idx} className="tool-card col-md-3">
            <Swiper>
              <SwiperSlide>
                <img
                  className="tool-img"
                  src={`${API_URL}/images/tools/${tool.img1}`}
                  alt=""
                  onClick={() =>
                    setSelectedImg(`${API_URL}/images/tools/${tool.img1}`)
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="tool-img"
                  src={`${API_URL}/images/tools/${tool.img2}`}
                  alt=""
                  onClick={() =>
                    setSelectedImg(`${API_URL}/images/tools/${tool.img2}`)
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="tool-img"
                  src={`${API_URL}/images/tools/${tool.img3}`}
                  alt=""
                  onClick={() =>
                    setSelectedImg(`${API_URL}/images/tools/${tool.img3}`)
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="tool-img"
                  src={`${API_URL}/images/tools/${tool.img4}`}
                  alt=""
                  onClick={() =>
                    setSelectedImg(`${API_URL}/images/tools/${tool.img4}`)
                  }
                />
              </SwiperSlide>
            </Swiper>
            <h1 className="tool-quantity">
              {tool.available} / {tool.quantity}
            </h1>
            <h1 className="tool-name">{tool.name}</h1>
            <h1 className="tool-desc">{tool.description}</h1>

            <button
              data-bs-toggle="modal"
              data-bs-target="#borrow-modal"
              type="button"
              onClick={() => [setToolID(tool.id), setToolName(tool.name)]}
            >
              ยืม
            </button>

            <button
              data-bs-toggle="modal"
              data-bs-target="#return-modal"
              type="button"
            >
              คืน
            </button>
          </section>
        ))}

        {/* ยืมจ้า */}
        <Modal
          modalID="borrow-modal"
          modalTitle="Borrow"
          modalBodyContent={
            <form>
              {/* Borrow Code */}
              <div className="input-box">
                <label htmlFor="borrowCode" className="mb-2">
                  * Borrow Code
                </label>
                <input
                  name="borrowCode"
                  type="text"
                  value={borrowCode}
                  className="form-control mb-3"
                  disabled
                />
              </div>

              {/* Student ID */}
              <div className="input-box">
                <label htmlFor="studentID" className="mb-2">
                  * Student ID
                </label>
                <input
                  name="studentID"
                  type="text"
                  value={id}
                  className="form-control mb-3"
                  disabled
                />
              </div>

              {/* Tool Name*/}
              <div className="input-box">
                <label htmlFor="toolName" className="mb-2">
                  * Tool Name
                </label>
                <input
                  name="toolName"
                  type="text"
                  value={toolName}
                  className="form-control mb-3"
                  disabled
                />
              </div>

              {/* Borrow Count */}
              <div className="input-box">
                <label htmlFor="borrowCount" className="mb-2">
                  * Quantity
                </label>
                <input
                  name="borrowCount"
                  type="number"
                  className="form-control mb-3"
                  placeholder="ex. 1, 2, 3, ..."
                  onChange={(e) => setBorrowCount(e.target.value)}
                />
              </div>

              {/* Tools Imgs */}
              <div className="input-box">
                <label htmlFor="imgs" className="form-label">
                  * Original-Images
                </label>
                <input
                  type="file"
                  name="imgs"
                  id="imgs"
                  className="form-control mb-3"
                  onChange={(e) => handleFileChange(e)}
                  multiple
                  accept="image/*"
                  onInput={(e) => {
                    if(e.target.files.length > 4){
                      alert(`Select only 4 images.`);
                      e.target.value = null
                    }
                  }}
                />

                { previewBefore ? (
                  <section className="preview-container">
                    {previewBefore.map((before, idx) => (
                        <img 
                          key={idx}
                          src={before}
                        />
                    ))}
                  </section>
                ) : <section className="preview-container d-none"></section> }
              </div>

              <button type="button" onClick={handleBorrow}>
                ยืมจ้า
              </button>
            </form>
          }
        />

        <Modal modalID="return-modal" modalTitle="Return" />
      </article>

      {/* Overlay for preview image */}
      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <img
              src={selectedImg}
              alt="Full-size preview"
              className="full-size-image"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Stu_Tools;
