import React, { useState, useEffect } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
import ModalApprove from "../../components/ModalApprove";
import ModalDel from "../../components/ModalDel";
import notFound from "../../assets/images/page-not-found.svg";

const API_URL = import.meta.env.VITE_API_URL;

const A_ShowTiktok = () => {
  // Get *ShowTiktok
  const [showTiktok, setShowTiktok] = useState([]);
  const [selectedShowTiktok, setselectedShowTiktok] = useState([]);
  // console.log(showTiktok);
  const handleShowTiktok = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowTiktok`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setShowTiktok(res.data);
      } else {
        alert(`Error to get *ShowTiktok, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  const handleselectedShowTiktok = async () => {
    try {
      const res = await Axios.get(`${API_URL}/selectedShowTiktok`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setselectedShowTiktok(res.data);
        setNewSelect(res.data);
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Tiktok) | Admin";
    handleShowTiktok();
    handleselectedShowTiktok();
  }, []);

  // Post *Selected ShowTiktok
  const [newSelect, setNewSelect] = useState([]);
  // console.log(newSelect)

  const handleNewSelect = (newItem) => {
    const isAlreadySelected = newSelect.some(
      (selected) => selected.id === newItem.id
    );

    if (isAlreadySelected) {
      // ถ้าเลือกซ้ำให้ลบออกจาก newSelect
      setNewSelect(newSelect.filter((selected) => selected.id !== newItem.id));
    } else {
      if (newSelect.length < 3) {
        // ถ้ายังไม่ครบ 3 อัน ให้เพิ่มเข้าไป
        setNewSelect([...newSelect, newItem]);
      } else {
        alert(`Select only 3 Showcase for 'Show'`);
      }
    }
  };

  const handleSaveNewSelect = async () => {
    try {
      const res = await Axios.post(
        `${API_URL}/selectedShowTiktok`,
        [newSelect],
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert(`Save New "Selected Showcase" Sueccessful.`);
        location.reload();
      } else {
        alert(`Save New "Selected Showcase" Failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err.message}`);
    }
  };

  // Put *Showcase
  const [oldShowTiktok, setOldShowTiktok] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newEmbed, setNewEmbed] = useState("");

  const handleEditShowTiktok = async () => {
    try {
      const updatedTopic = newTopic.trim() ? newTopic : oldShowTiktok.topic;
      const updatedEmbed = newEmbed.trim() ? newEmbed : oldShowTiktok.embed;

      const res = await Axios.put(
        `${API_URL}/studentShowTiktok/${oldShowTiktok.id}`,
        { topic: updatedTopic, embed: updatedEmbed },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Edit Showcase (id: ${oldShowTiktok.id}) Successful.`);
        location.reload();
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // Delete *Showcase
  const [delInfo, setDelInfo] = useState([]);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowTiktok = showTiktok.filter(
    (item) => filter === "All" || item.status === filter
  );

  // Load Tiktok
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showTiktok]);

  return (
    <main className="a-showtiktok-container">
      <article className="top-container">
        <h1 className="topic m-0">ShowTiktok Management (Tiktok)</h1>

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
              className={`btn btn-Waiting
                ${filter === "Waiting" ? "active" : ""}
              `}
              onClick={() => setFilter("Waiting")}
            >
              Waiting
            </button>
          </section>

          <section className="btn-right-side">
            <button
              className="btn btn-save-select"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modal-save-select"
            >
              Save Select
            </button>
          </section>
        </section>
      </article>

      {filteredShowTiktok.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="svg-not-found" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {filteredShowTiktok.map((ShowTiktokItem, idx) => (
            <section key={idx} className="col-sm-12 col-md-3">
              <section
                className={`content-card
                ${
                  newSelect.some(
                    (selected) => selected.id === ShowTiktokItem.id
                  )
                    ? "selected"
                    : ""
                }  
              `}
              >
                <button
                  data-bs-toggle={
                    ShowTiktokItem.status === "Waiting" ? "modal" : ""
                  }
                  data-bs-target="#modal-approve"
                  className={`btn btn-approve
                  ${
                    ShowTiktokItem.status === "Approved"
                      ? "Approved"
                      : "Waiting"
                  } `}
                  onClick={() => setApproveItem(ShowTiktokItem)}
                >
                  {ShowTiktokItem.status === "Approved" ? (
                    <span className="btn-content">
                      <ion-icon name="checkmark-circle"></ion-icon>
                      Approved
                    </span>
                  ) : (
                    <span className="btn-content">
                      <ion-icon name="checkmark-circle"></ion-icon>
                      Waiting
                    </span>
                  )}
                </button>

                <section
                  className="content-tiktok"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: ShowTiktokItem.embed }}
                />

                <section onClick={() => handleNewSelect(ShowTiktokItem)}>
                  <section className="content-text">
                    <p className="student-id">
                      ID - {ShowTiktokItem.studentID}
                    </p>
                    <h1 className="topic">{ShowTiktokItem.topic}</h1>
                    <p className="desc">{ShowTiktokItem.description}</p>
                  </section>

                  <section className="content-btn">
                    <button
                      className="btn btn-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-edit"
                      onClick={(e) => [
                        e.stopPropagation(),
                        setOldShowTiktok(ShowTiktokItem),
                      ]}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      onClick={(e) => [
                        e.stopPropagation(),
                        setDelInfo(ShowTiktokItem),
                      ]}
                    >
                      Delete
                    </button>
                  </section>
                </section>
              </section>
            </section>
          ))}
        </article>
      )}

      {/* Modal *Approve */}
      <ModalApprove approveItem={approveItem} approvePath="studentShowTiktok" />

      {/* Modal *Edit */}
      <Modal
        modalID="modal-edit"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="modal-edit">
            <h1 className="topic">Edit *Showcase</h1>

            {/* New *Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * New Topic
              </label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder={oldShowTiktok.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* New *Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * New Embed
              </label>
              <textarea
                type="text"
                className="form-control mb-3"
                placeholder={oldShowTiktok.embed}
                onChange={(e) => setNewEmbed(e.target.value)}
              ></textarea>
            </div>

            <section
              className="content-tiktok"
              dangerouslySetInnerHTML={{
                __html: newEmbed ? newEmbed : oldShowTiktok.embed,
              }}
            />

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handleEditShowTiktok}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal *Delete */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowTiktok"
      />

      {/* Modal *Save Select */}
      <Modal
        modalID="modal-save-select"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <article className="modal-save-select">
            <h2 className="topic">Save Select For Show</h2>

            <p className="desc">
              Are you going to save select this 'ShowTiktok' for show
            </p>
            {newSelect.map((newSelect, idx) => (
              <ul key={idx} className="select-list">
                <li className="select">{newSelect.topic}</li>
              </ul>
            ))}

            <section className="btn-container">
              <button className="btn btn-no" data-bs-dismiss="modal">
                No, Select New
              </button>

              <button
                className="btn btn-yes"
                type="button"
                disabled={newSelect.length !== 3}
                onClick={handleSaveNewSelect}
              >
                Yes, Select it!
              </button>
            </section>
          </article>
        }
      />
    </main>
  );
};

export default A_ShowTiktok;
