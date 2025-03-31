import React, { useEffect, useState } from "react";
import Axios, { all } from "axios";

import Modal from "../../components/Modal";
import ModalDel from "../../components/ModalDel";
import notFound from '../../assets/images/page-not-found.svg'

const API_URL = import.meta.env.VITE_API_URL;

const Stu_Showcase = ({ id }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  // GET ALL *SHOWCASE
  const [showcase, setShowcase] = useState([]);
  const handleGetShowcase = async () => {
    try {
      const res = await Axios.get(`${API_URL}/studentShowcase/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  // POST NEW *SHOWCASE
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const handlePostShowcase = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", id);
      formData.append("topic", topic);
      formData.append("description", description);
      formData.append("image", image);

      const res = await Axios.post(`${API_URL}/studentShowcase`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New Showcase Succesful.`);
        location.reload();
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
        location.reload();
      }
    } catch {
      alert(`Internal server ${err}`);
    }
  };

  // ... handleImg
  const handleImg = (e) => {
    setImage(e);
    setPreviewImage(URL.createObjectURL(e));
  };

  // PUT *SHOWCASE
  const [oldInfo, setOldInfo] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState();
  const [newPreviewImage, setNewPreviewImage] = useState();

  const handlePutShowcase = async () => {
    try {
      // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
      const updatedTopic = newTopic.trim() ? newTopic : oldInfo.topic;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldInfo.description;
      const updatedImage = newImage ? newImage : oldInfo.image; // ใช้รูปเก่าถ้าไม่มีการอัปโหลดรูปใหม่

      const formData = new FormData();
      formData.append("topic", updatedTopic);
      formData.append("description", updatedDescription);
      formData.append("image", updatedImage);

      const res = await Axios.put(
        `${API_URL}/studentShowcase/${oldInfo.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Update Showcase Successful.`);
        location.reload();
      } else {
        alert(`Error to Update Showcase, for this id: ${oldInfo.id}`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // ... handleImg
  const handleNewImg = (e) => {
    setNewImage(e);
    setNewPreviewImage(URL.createObjectURL(e));
  };

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
  };

  useEffect(() => {
    document.title = "Showcase (Files)| Student";
    handleGetShowcase();
  }, []);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowcase = showcase.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <main className="stu-showcase-container">
      {/* Header */}
      <article className="top-container">
        <button
          data-bs-toggle="modal"
          data-bs-target="#add-showcase"
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
          {filteredShowcase.map((showcaseItem, idx) => (
            <section key={idx} className="col-sm-6 col-md-3">
              <section className="content-card" key={idx}>
                <button
                  data-bs-toggle={
                    showcaseItem.status === "Waiting" ? "modal" : ""
                  }
                  data-bs-target="#modal-approve"
                  className={`btn btn-approve
                        ${
                          showcaseItem.status === "Approved"
                            ? "Approved"
                            : "Waiting"
                        } `}
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
                  onClick={() => setSelectedImg(showcaseItem.image)}
                />
                <section className="content-text">
                  <h1 className="topic">{showcaseItem.topic}</h1>
                  <p className="desc">{showcaseItem.description}</p>
                </section>

                <section className="content-btn">
                  <button
                    className="btn btn-edit"
                    data-bs-toggle="modal"
                    data-bs-target="#update-showcase"
                    onClick={() => setOldInfo(showcaseItem)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-showcase"
                    onClick={() => setDelInfo(showcaseItem)}
                  >
                    Delete
                  </button>
                </section>
              </section>
            </section>
          ))}
        </article>
      )}

      {/* Modal - Add *Showcase */}
      <Modal
        modalID="add-showcase"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="stu-form-showcase">
            <h1 className="topic">Showcase</h1>

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
                placeholder="ex. showcase #1"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder="type description..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleImg(e.target.files[0])}
              />
            </div>

            {previewImage ? (
              <img src={previewImage} className="preview-image" />
            ) : null}

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
                onClick={handlePostShowcase}
                className="btn btn-add"
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *Showcase */}
      <Modal
        modalID="update-showcase"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="stu-form-showcase">
            <h1 className="topic">Showcase</h1>

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

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder={oldInfo.description}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleNewImg(e.target.files[0])}
              />
            </div>

            {previewImage ? <img src={previewImage} /> : null}

            {oldInfo ? (
              newPreviewImage ? (
                <img
                  src={newPreviewImage}
                  alt="New Preview"
                  className="preview-image"
                />
              ) : (
                <img
                  className="preview-image"
                  src={`${API_URL}/images/stu_showcase/${oldInfo.image}`}
                  alt={oldInfo.topic}
                />
              )
            ) : null}

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
                onClick={handlePutShowcase}
                className="btn btn-edit"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *Showcase */}
      <ModalDel
        modalDelID="delete-showcase"
        modalDelTitle="(Student) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowcase"
      />

      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <img
              src={`${API_URL}/images/stu_showcase/${selectedImg}`}
              alt="Original Image"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Stu_Showcase;
