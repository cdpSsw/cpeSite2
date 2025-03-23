import React, { useState } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const ModalAE_Activities = ({ modalAEID, modalAEComp, modalAEOldInfo }) => {
  // -------------------------------insert *new------------------------------
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState();

  const [posterPreview, setPosterPreview] = useState();
  const handlePoster = (e) => {
    setPosterPreview(URL.createObjectURL(e));
    setPoster(e);
  };

  const handelInsertNew = async () => {
    try {
      const formData = new FormData();
      formData.append("topic", topic);
      formData.append("description", description);
      formData.append("poster", poster);

    //   console.log(`Send data: ${formData}`);

      const res = await Axios.post(`${API_URL}/activities`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.status);
      if (res.status === 200) {
        alert(`Insert *New Activities Successful`);
        location.reload();
        setTopic("");
        setDescription("");
        setPoster();
      } else {
        alert(`Insert *New Activities Failed, try again...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // -------------------------------edit------------------------------------
  // console.log(modalAEOldInfo)
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPoster, setNewPoster] = useState();

  const [newPosterPreview, setNewPosterPreview] = useState();
  const handleNewPoster = (e) => {
    setNewPosterPreview(URL.createObjectURL(e));
    setNewPoster(e);
  };

  const handelUpdate = async (id) => {
  
    const formData = new FormData();
    formData.append("topic", newTopic?.trim() ? newTopic : modalAEOldInfo.topic);
    formData.append("description", newDescription?.trim() ? newDescription : modalAEOldInfo.description);
    // formData.append("poster", newPoster ? newPoster : `${API_URL}/images/activities/${modalAEOldInfo?.poster}`);

    if(newPoster){
      formData.append("poster", newPoster)
    } else {
      formData.append("poster", modalAEOldInfo.poster)
    }
    
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });
  
    try {
        const res = await Axios.put(`${API_URL}/activities/${id}`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
  
      // console.log(res.status);
      if (res.status === 200) {
        alert(`Update *Activities Successful`);
        location.reload();

      } else {
        alert(`Update *Activities Failed, try again...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };
  

  const handleCancel = () => {
    setTopic("");
    setDescription("");
    setPosterPreview("");
    setNewTopic("");
    setNewDescription("");
    setNewPosterPreview("");
  };

  return (
    <Modal
      modalID={modalAEID}
      modalHeaderStyle="d-none"
      modalFooterStyle="d-none"
      modalClosedBTNStyle="d-none"
      modalBodyContent={
        <section className="form-ae-activities">
          <h1>Activities</h1>
          <hr />
          <form>
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
                placeholder={
                  modalAEComp === "add"
                    ? "ex. topic #1"
                    : `${modalAEOldInfo.topic}`
                }
                onChange={(e) => {
                  modalAEComp === "add"
                    ? setTopic(e.target.value)
                    : setNewTopic(e.target.value);
                }}
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="form-label">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder={
                  modalAEComp === "add"
                    ? "type description ..."
                    : `${modalAEOldInfo.description}`
                }
                onChange={(e) => {
                  modalAEComp === "add"
                    ? setDescription(e.target.value)
                    : setNewDescription(e.target.value);
                }}
              ></textarea>
            </div>

            {/* Poster */}
            <div className="input-box">
              <label htmlFor="poster" className="form-label">
                * Poster
              </label>
              <input
                type="file"
                name="poster"
                id="poster"
                className="form-control mb-3"
                onChange={(e) => {
                  modalAEComp === "add"
                    ? handlePoster(e.target.files[0])
                    : handleNewPoster(e.target.files[0]);
                }}
              />
            </div>

            <section className="preview-container">
              {modalAEComp === "add" ? (
                posterPreview ? (
                  <img src={posterPreview} alt="Poster Preview" />
                ) : null
              ) : newPosterPreview ? (
                <img src={newPosterPreview} alt="Updated Poster Preview" />
              ) : (
                <img src={`${API_URL}/images/activities/${modalAEOldInfo?.poster}`} alt="Original Poster" />
              )}
            </section>
          </form>

          <section className="btn-container">
            <button
              data-bs-dismiss="modal"
              className="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button 
                className="add-new" 
                onClick={modalAEComp === 'add' ? handelInsertNew : () => handelUpdate(modalAEOldInfo.id)}
            >
              {modalAEComp === 'add' ? "Add New" : "Update Activities"}
            </button>
          </section>
        </section>
      }
    />
  );
};

export default ModalAE_Activities;
