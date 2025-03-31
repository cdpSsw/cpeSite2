import React, { useEffect, useState } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
import ModalDel from "../../components/ModalDel";
import notFound from "../../assets/images/page-not-found.svg";

const API_URL = import.meta.env.VITE_API_URL;

const Stu_ShowTiktok = ({ id }) => {
  // GET ALL *showTiktok
  const [showTiktok, setShowTiktok] = useState([]);
  const handleGetShowTiktok = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowTiktok/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowTiktok(res.data);
      } else {
        alert(`Error to get showTiktok, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  // POST NEW *showTiktok
  const [topic, setTopic] = useState("");
  const [embed, setEmbed] = useState("");

  const handlePostshowTiktok = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", id);
      formData.append("topic", topic);
      formData.append("embed", embed);

      const res = await Axios.post(`${API_URL}/studentshowTiktok`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New showTiktok Succesful.`);
        location.reload();
      } else {
        alert(`Error to get showTiktok, for this id: ${id}`);
        location.reload();
      }
    } catch {
      alert(`Internal server ${err}`);
    }
  };

  // PUT *showTiktok
  const [oldInfo, setOldInfo] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newembed, setNewembed] = useState("");

  const handlePutshowTiktok = async () => {
    try {
      // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
      const updatedTopic = newTopic.trim() ? newTopic : oldInfo.topic;
      const updatedembed = newembed.trim() ? newembed : oldInfo.embed;

      const formData = new FormData();
      formData.append("topic", updatedTopic);
      formData.append("embed", updatedembed);

      const res = await Axios.put(
        `${API_URL}/studentshowTiktok/${oldInfo.id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Update showTiktok Successful.`);
        location.reload();
      } else {
        alert(`Error to Update showTiktok, for this id: ${oldInfo.id}`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // DELETE *showTiktok
  const [delInfo, setDelInfo] = useState([]);
  console.log(delInfo);
  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("topic").value = "";
    document.getElementById("embed").value = "";
  };

  useEffect(() => {
    document.title = "Showcase (Tiktok)| Student";
    handleGetShowTiktok();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showTiktok]);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowcase = showTiktok.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <main className="stu-showTiktok-container">
      {/* Header */}
      <article className="top-container">
        <button
          data-bs-toggle="modal"
          data-bs-target="#add-showTiktok"
          className="btn btn-add-new"
        >
          Add New
        </button>
        <h1 className="topic">All Showcase Files</h1>

        <section className="btn-container mt-3">
          <section className="btn-left-side">
            <button
              className={`btn btn-all
                ${filter === "All" ? "active" : ""}
              `}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`btn btn-approved
                ${filter === "Approved" ? "active" : ""}
              `}
              onClick={() => setFilter("Approved")}
            >
              Approved
            </button>
            <button
              className={`btn btn-waiting
                ${filter === "Waiting" ? "active" : ""}
              `}
              onClick={() => setFilter("Waiting")}
            >
              Waiting
            </button>
          </section>
        </section>
      </article>

      {/* Content */}
      {filteredShowcase.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="svg-not-found" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {filteredShowcase.map((showTiktokItem, idx) => (
            <section key={idx} className="col-sm-12 col-md-3">
              <section className="content-card" key={idx}>
                <button
                  data-bs-toggle={
                    showTiktokItem.status === "Waiting" ? "modal" : ""
                  }
                  data-bs-target="#modal-approve"
                  className={`btn btn-approve
                  ${
                    showTiktokItem.status === "Approved"
                      ? "Approved"
                      : "Waiting"
                  } `}
                  onClick={() => setApproveItem(showTiktokItem)}
                >
                  {showTiktokItem.status === "Approved" ? (
                    <span className="btn-content">
                      <ion-icon name="checkmark-circle"></ion-icon>
                      Approved
                    </span>
                  ) : (
                    <span className="btn-content">
                      <ion-icon name="checkmark-circle"></ion-icon>
                      Wating
                    </span>
                  )}
                </button>
                <section
                  className="content-tiktok"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: showTiktokItem.embed }}
                />
                <section className="content-text">
                  <p className="student-id">ID - {showTiktokItem.studentID}</p>
                  <h1 className="topic">{showTiktokItem.topic}</h1>
                  <p className="desc">{showTiktokItem.description}</p>
                </section>

                <section className="content-btn">
                  <button
                    className="btn btn-edit"
                    data-bs-toggle="modal"
                    data-bs-target="#update-showTiktok"
                    onClick={(e) =>[ 
                      e.stopPropagation(),
                      setOldInfo(showTiktokItem)
                    ]}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-showTiktok"
                    onClick={(e) => {
                      e.stopPropagation(),
                      setDelInfo(showTiktokItem);
                      console.log("Deleted Item Set:", showTiktokItem);
                    }}
                  >
                    Delete
                  </button>
                </section>
              </section>
            </section>
          ))}
        </article>
      )}
      {/* Modal - Add *showTiktok */}
      <Modal
        modalID="add-showTiktok"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="stu-form-showTiktok">
            <h1 className="topic">showTiktok</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder="ex. showTiktok #1"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * embed
              </label>
              <textarea
                type="text"
                name="embed"
                id="embed"
                className="form-control mb-3"
                placeholder="type embed..."
                onChange={(e) => setEmbed(e.target.value)}
              ></textarea>
            </div>

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePostshowTiktok}
                className="btn btn-add"
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *showTiktok */}
      <Modal
        modalID="update-showTiktok"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="stu-form-showTiktok">
            <h1 className="topic">showTiktok</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder={oldInfo.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * embed
              </label>
              <textarea
                type="text"
                name="embed"
                id="embed"
                className="form-control mb-3"
                placeholder={oldInfo.embed}
                onChange={(e) => setNewembed(e.target.value)}
              ></textarea>
            </div>

            <section
              className="content-tiktok"
              dangerouslySetInnerHTML={{
                __html: newembed ? newembed : oldInfo.embed,
              }}
            />

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePutshowTiktok}
                className="btn btn-edit"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *showTiktok */}
      <ModalDel
        modalDelID="delete-showTiktok"
        modalDelTitle="(Student) ShowTiktok"
        modalDelContent={delInfo}
        modalDelPath="studentshowTiktok"
      />
    </main>
  );
};

export default Stu_ShowTiktok;
