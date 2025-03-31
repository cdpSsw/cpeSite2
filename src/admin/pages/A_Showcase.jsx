import React, { useState, useEffect } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
import ModalApprove from "../../components/ModalApprove";
import ModalDel from "../../components/ModalDel";
import notFound from "../../assets/images/page-not-found.svg";

const API_URL = import.meta.env.VITE_API_URL;

const A_Showcase = () => {
  // Get *Showcase
  const [showcase, setShowcase] = useState([]);
  const [selectedShowcase, setSelectedShowcase] = useState([]);
  // console.log(showcase);
  // console.log(selectedShowcase);

  const handleShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase`, {
        withCredentials: true,
      });
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

  const handleSelectedShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/selectedShowcase`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setSelectedShowcase(res.data);
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
    document.title = "Showcase (Files) | Admin";
    handleShowcase();
    handleSelectedShowcase();
  }, []);

  // Post *Selected Showcase
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
      const res = await Axios.post(`${API_URL}/selectedShowcase`, [newSelect], {
        withCredentials: true,
      });
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
  const [oldShowcase, setOldShowcase] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState();
  const [previewNewImage, setPreviewNewImage] = useState();

  const handleEditShowcase = async () => {
    try {
      const updatedTopic = newTopic.trim() ? newTopic : oldShowcase.topic;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldShowcase.description;
      const updatedImage = newImage ? newImage : oldShowcase.image;

      const formData = new FormData();
      formData.append("topic", updatedTopic);
      formData.append("description", updatedDescription);
      formData.append("image", updatedImage);

      const res = await Axios.put(
        `${API_URL}/studentShowcase/${oldShowcase.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Edit Showcase (id: ${oldShowcase.id}) Successful.`);
        location.reload();
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  const handleNewImage = (e) => {
    setNewImage(e);
    setPreviewNewImage(URL.createObjectURL(e));
  };

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // Delete *Showcase
  const [delInfo, setDelInfo] = useState([]);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowcase = showcase.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <main className="a-showcase-container">
      <article className="top-container">
        <h1 className="topic m-0">Showcase Management (Files)</h1>

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

      {filteredShowcase.length == 0 ? (
        <section className="not-found-container">
          <img src={notFound} className="svg-not-found" />
        </section>
      ) : (
        <article className="content-container row m-0">
          {filteredShowcase.map((showcaseItem, idx) => (
            <section key={idx} className="col-sm-6 col-md-3">
              <section
                className={`content-card
                ${
                  newSelect.some((selected) => selected.id === showcaseItem.id)
                    ? "selected"
                    : ""
                }  
              `}
              >
                <button
                  data-bs-toggle={
                    showcaseItem.status === "Waiting" ? "modal" : ""
                  }
                  data-bs-target="#modal-approve"
                  className={`btn btn-approve
                  ${
                    showcaseItem.status === "Approved" ? "Approved" : "Waiting"
                  } `}
                  onClick={(e) => [
                    e.stopPropagation(),
                    setApproveItem(showcaseItem),
                  ]}
                >
                  {showcaseItem.status === "Approved" ? (
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

                <img
                  className="content-img"
                  src={`${API_URL}/images/stu_showcase/${showcaseItem.image}`}
                  alt={showcaseItem.topic}
                />
                <section onClick={() => handleNewSelect(showcaseItem)}>
                  <section className="content-text">
                    <p className="student-id">ID - {showcaseItem.studentID}</p>
                    <h1 className="topic">{showcaseItem.topic}</h1>
                    <p className="desc">{showcaseItem.description}</p>
                  </section>

                  <section className="content-btn">
                    <button
                      className="btn btn-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-edit"
                      onClick={(e) => [
                        e.stopPropagation(),
                        setOldShowcase(showcaseItem),
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
                        setDelInfo(showcaseItem),
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
      <ModalApprove approveItem={approveItem} approvePath="studentShowcase" />

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
                placeholder={oldShowcase.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* New *Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * New Description
              </label>
              <textarea
                type="text"
                className="form-control mb-3"
                placeholder={oldShowcase.description}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>
            </div>

            {/* New Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * New Image
              </label>
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => handleNewImage(e.target.files[0])}
              />
            </div>

            {previewNewImage ? (
              <section className="preview-container">
                <img
                  src={previewNewImage}
                  alt="Preview: New Image"
                  className="img-preview"
                />
              </section>
            ) : (
              <section className="preview-container">
                <img
                  src={`${API_URL}/images/stu_showcase/${oldShowcase.image}`}
                  alt="Preview: Old Image"
                  className="img-preview"
                />
              </section>
            )}

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
                onClick={handleEditShowcase}
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
        modalDelPath="studentShowcase"
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
              Are you going to save select this 'Showcase' for show
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

export default A_Showcase;
