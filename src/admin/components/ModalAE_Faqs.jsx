import React, { useEffect, useState } from "react";
import Axios from "axios";

import Modal from "../../components/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const ModalAE_Faqs = ({ modalAEID, modalAEComp, modalAEOldInfo }) => {
  // -------------------------------insert *new------------------------------
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handelInsertNew = async () => {
    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      const res = await Axios.post(`${API_URL}/faqs`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);
      if (res.status === 200) {
        alert(`Insert New *Faqs Successful`);
        location.reload();
        setQuestion("");
        setAnswer("");
      } else {
        alert(`Insert New *Faqs Failed, try again...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // -------------------------------edit------------------------------------
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handelUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("question", newQuestion?.trim() ? newQuestion : modalAEOldInfo.question);
      formData.append("answer", newAnswer?.trim() ? newAnswer : modalAEOldInfo.answer);
      formData.forEach((data) => console.log("Send Data: ", data));

      const res = await Axios.put(`${API_URL}/faqs/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert(`Update *Faqs Successful`);
        location.reload();
      } else {
        alert(`Update *Faqs Failed, try again...`);
      }
    } catch (err) {
      alert(`Internal server, ${err}`);
    }
  };

  const handleCancel = () => {
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  };

  return (
    <Modal
      modalID={modalAEID}
      modalHeaderStyle="d-none"
      modalFooterStyle="d-none"
      modalClosedBTNStyle="d-none"
      modalBodyContent={
        <section className="form-ae-faqs">
          <h1 className="form-topic">Faqs</h1>
          <hr />
          <form className="form">
            {/* question */}
            <div className="input-box">
              <label htmlFor="question" className="form-label">
                * Question
              </label>
              <input
                type="text"
                name="question"
                id="question"
                className="form-control mb-3"
                placeholder={
                  modalAEComp === "add"
                    ? "ex. question #1"
                    : `${modalAEOldInfo.question}`
                }
                onChange={(e) => {
                  modalAEComp === "add"
                    ? setQuestion(e.target.value)
                    : setNewQuestion(e.target.value);
                }}
              />
            </div>

            {/* answer */}
            <div className="input-box">
              <label htmlFor="answer" className="form-label">
                * Answer
              </label>
              <textarea
                type="text"
                name="answer"
                id="answer"
                className="form-control mb-3"
                placeholder={
                  modalAEComp === "add"
                    ? "type answer ..."
                    : `${modalAEOldInfo.answer}`
                }
                onChange={(e) => {
                  modalAEComp === "add"
                    ? setAnswer(e.target.value)
                    : setNewAnswer(e.target.value);
                }}
              ></textarea>
            </div>
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
              onClick={
                modalAEComp === "add"
                  ? handelInsertNew
                  : () => handelUpdate(modalAEOldInfo.id)
              }
              disabled={
                modalAEComp === "add"
                  ? !question.trim() || !answer.trim()
                  : null
              }
            >
              {modalAEComp === "add" ? "Add New" : `Update Faq`}
            </button>
          </section>
        </section>
      }
    />
  );
};

export default ModalAE_Faqs;
