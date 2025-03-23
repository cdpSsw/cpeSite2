import React, { useEffect, useState } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const ModalAE_CareerP = ({ modalAEID, modalAEComp, modalAEOldInfo }) => {
  // ------------------------------- State ------------------------------
  const [icon, setIcon] = useState("hardware-chip-outline");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const [newIcon, setNewIcon] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [dropdown, setDropdown] = useState(false);
  const icons = [
    { name: "hardware-chip-outline" },
    { name: "share-social-outline" },
    { name: "server-outline" },
    { name: "analytics-outline" },
    { name: "bar-chart-outline" },
    { name: "git-branch-outline" },
    { name: "wifi-outline" },
  ];

  // ตั้งค่าข้อมูลเดิมเมื่อเป็นโหมดแก้ไข
  useEffect(() => {
    if (modalAEComp === "edit" && modalAEOldInfo) {
      setNewIcon(modalAEOldInfo.icon || "hardware-chip-outline");
      setNewTopic(modalAEOldInfo.topic || "");
      setNewDescription(modalAEOldInfo.description || "");
    }
  }, [modalAEComp, modalAEOldInfo]);

  // ------------------------------- Insert New Career Path ------------------------------
  const handelInsertNew = async () => {
    try {
      const formData = new FormData();
      formData.append("icon", icon);
      formData.append("topic", topic);
      formData.append("description", description);

      const res = await Axios.post(`${API_URL}/careerPath`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      
      // console.log(`res.status: ${res.status}`);
      if (res.status === 200) {
        alert("Insert *New Career Path Successful");
        location.reload();
      } else {
        alert("Insert *New Career Path Failed, try again...");
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // ------------------------------- Update Career Path ------------------------------
  const handelUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("icon", newIcon?.trim() ? newIcon : modalAEOldInfo.icon);
      formData.append(
        "topic",
        newTopic?.trim() ? newTopic : modalAEOldInfo.topic
      );
      formData.append(
        "description",
        newDescription?.trim() ? newDescription : modalAEOldInfo.description
      );

      const res = await Axios.put(`${API_URL}/careerPath/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // console.log(`res.status: ${res.status}`);

      if (res.status === 200) {
        alert("Update *Career Path Successful");
        location.reload();
      } else {
        alert("Update *Career Path Failed, try again...");
      }
    } catch (err) {
      alert(`Internal server, ${err}`);
    }
  };

  // ------------------------------- UI ------------------------------
  return (
    <Modal
      modalID={modalAEID}
      modalHeaderStyle="d-none"
      modalFooterStyle="d-none"
      modalClosedBTNStyle="d-none"
      modalBodyContent={
        <section className="form-ae-careerp">
          <h1 className="form-topic">Career Path</h1>
          <hr />
          <form className="form">
            {/* Icon */}
            <section className="icon-container row m-0 p-0">
              <label className="m-0 p-0" htmlFor="icon">
                * Icon{" "}
                <span>
                  or ( Recommend from{" "}
                  <a href="https://ionic.io/ionicons" target="_blank">
                    ionic.io/ionicons
                  </a>{" "}
                  )
                </span>
              </label>
              <div className="input-box box-icon col-sm-2 d-flex">
                <button
                  className="icon-btn my-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdown(!dropdown);
                  }}
                >
                  <ion-icon name={modalAEComp === "add" ? icon : newIcon}></ion-icon>
                </button>

                {dropdown && (
                  <ul className="icon-list">
                    {icons.map((icon, idx) => (
                      <li
                        className="icon-item"
                        key={idx}
                        onClick={() => {
                          modalAEComp === "add"
                            ? setIcon(icon.name)
                            : setNewIcon(icon.name);
                          setDropdown(false);
                        }}
                      >
                        <ion-icon name={icon.name}></ion-icon>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="text-or my-3">or</p>
              </div>
              <div className="input-box col-sm-10 d-flex m-0 p-0">
                <input
                  type="text"
                  name="icon"
                  id="icon"
                  className="form-control my-3"
                  placeholder="ex. accessibility-outline"
                  value={modalAEComp === "add" ? icon : newIcon}
                  onChange={(e) =>
                    modalAEComp === "add"
                      ? setIcon(e.target.value)
                      : setNewIcon(e.target.value)
                  }
                />
              </div>
            </section>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="form-label">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder="Enter topic"
                value={modalAEComp === "add" ? topic : newTopic}
                onChange={(e) =>
                  modalAEComp === "add"
                    ? setTopic(e.target.value)
                    : setNewTopic(e.target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="form-label">
                * Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder="Enter description"
                value={modalAEComp === "add" ? description : newDescription}
                onChange={(e) =>
                  modalAEComp === "add"
                    ? setDescription(e.target.value)
                    : setNewDescription(e.target.value)
                }
              ></textarea>
            </div>
          </form>

          <section className="btn-container">
            <button data-bs-dismiss="modal" className="cancel">
              Cancel
            </button>

            <button
              className="add-new"
              onClick={
                modalAEComp === "add"
                  ? handelInsertNew
                  : () => handelUpdate(modalAEOldInfo.id)
              }
              disabled={
                modalAEComp === "add"
                  ? !icon.trim() || !topic.trim() || !description.trim()
                  : !newIcon.trim() || !newTopic.trim() || !newDescription.trim()
              }
            >
              {modalAEComp === "add" ? "Add New" : "Update Career Path"}
            </button>
          </section>
        </section>
      }
    />
  );
};

export default ModalAE_CareerP;
