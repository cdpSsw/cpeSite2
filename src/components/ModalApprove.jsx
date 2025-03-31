import React from "react";
import Axios from "axios";

import Modal from "./Modal";
const API_URL = import.meta.env.VITE_API_URL;

const ModalApprove = ({ approveItem, approvePath }) => {
  // console.log(approveItem)
  const handleApprove = async ({ id }) => {
    try {
      // console.log(id);
      const res = await Axios.put(`${API_URL}/${approvePath}/status/${id}`, 
        { status: "Approved" },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert(`Approve Successful.`);
        location.reload();
      } else {
        alert(`Approve Failed.`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  return (
    <Modal
      modalID="modal-approve"
      modalHeaderStyle="d-none"
      modalFooterStyle="d-none"
      modalBodyContent={
        <article className="modal-approve">
          <ion-icon name="checkmark-circle"></ion-icon>
          <h1 className="topic">
            Approve <strong>Showcase</strong>
          </h1>
          <p className="desc mb-1">
            You're going to approve <span>{approveItem.topic}</span>
          </p>
          <p className="desc">
            By Student ID: <span>{approveItem.studentID}</span>
          </p>
          <section className="btn-container">
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-cancel"
            >
              No, Cancel
            </button>
            <button
              type="button"
              onClick={() => handleApprove({ id: approveItem.id })}
              className="btn btn-approve"
            >
              Yes, Approve!
            </button>
          </section>
        </article>
      }
    />
  );
};

export default ModalApprove;
