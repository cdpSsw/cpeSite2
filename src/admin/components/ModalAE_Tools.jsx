import React, { useState } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const ModalAE_Tools = ({ modalAEID, modalAEComp, modalAEOldInfo }) => {
  //   console.log(modalAEID);
  //   console.log(modalAEComp);

  // *add - setup
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();
  const [imgs, setImgs] = useState([]);
  const [preview, setPreview] = useState([]);

  // *update - setup
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newQuantity, setNewQuantity] = useState();
  const [newImgs, setNewImgs] = useState([]);
  const [newPreview, setNewPreview] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImgs([...files]);
  
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview([...previewUrls]); 
  };
  
  
//   console.log(imgs)
  // -------------------------------*insert new------------------------------
  const handelInsertNew = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("available", quantity);
      
      imgs.forEach((img) => {
        formData.append("imgs", img);
      });
  
      const res = await Axios.post(`${API_URL}/tools`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.status === 200) {
        alert("Insert New *Tools Successful");
        location.reload();
      } else {
        alert("Insert New *Tools Failed, try again...");
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };
  

  const handelUpdate = () => {
    console.log(`Update ...`)
  }

  const handleCancel = () => {
    setName("");
    setDescription("");
    setQuantity("");
    setImgs([]);
    setPreview([]);
  };
  

  return (
    <Modal
      modalID={modalAEID}
      modalHeaderStyle="d-none"
      modalFooterStyle="d-none"
      modalClosedBTNStyle="d-none"
      modalBodyContent={
        <section className="form-ae-tools">
          <h1>Activities</h1>
          <hr />
          <form>
            {/* Tools Name */}
            <div className="input-box">
              <label htmlFor="name" className="form-label">
                * Tools Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mb-3"
                placeholder={
                  modalAEComp === "add"
                    ? "ex. name #1"
                    : `${modalAEOldInfo.name}`
                }
                onChange={(e) => {
                  modalAEComp === "add"
                    ? setName(e.target.value)
                    : setNewName(e.target.value);
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

            {/* Tools Quantity */}
            <div className="input-box">
              <label htmlFor="quantity" className="form-label">
                * Quantity
              </label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                className="form-control mb-3"
                placeholder={
                  modalAEComp === "add"
                    ? "Quantity"
                    : `${modalAEOldInfo.quantity}`
                }
                onChange={(e) => {
                  modalAEComp === "add"
                    ? setQuantity(e.target.value)
                    : setNewQuantity(e.target.value);
                }}
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
                onChange={(e) => {
                  modalAEComp === "add"
                    ? handleFileChange(e)
                    : handleNewPoster(e.target.files[0]);
                }}
                multiple
              />
            </div>

            <section className="preview-container">
              {modalAEComp === "add" ? (
                preview ? (
                  <div>
                    {preview.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`preview-${index}`}
                        style={{
                          width: "200px",
                          margin: "10px",
                          borderRadius: "10px",
                        }}
                      />
                    ))}
                  </div>
                ) : null
              ) : newPreview ? (
                <img src={newPreview} alt="Updated Poster Preview" />
              ) : (
                <img
                  src={`${API_URL}/images/activities/${modalAEOldInfo?.poster}`}
                  alt="Original Poster"
                />
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
              {modalAEComp === "add" ? "Add New" : "Update Activities"}
            </button>
          </section>
        </section>
      }
    />
  );
};

export default ModalAE_Tools;
