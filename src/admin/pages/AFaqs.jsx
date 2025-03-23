import React, { useEffect, useState } from "react";
import Axios from "axios";

import AHeader from "../components/AHeader";
import ModalAE_Faqs from "../components/ModalAE_Faqs";
import ModalDel from "../components/ModalDel";

const API_URL = import.meta.env.VITE_API_URL;

const AFaqs = () => {
  // -------------------------------insert *new (AE_MODAL)------------------------------
  const [comp, setComp] = useState("");
  const [oldInfo, setOldInfo] = useState([]);

  // -----------------------------get all & get selected------------------------------
  const [allFaqs, setAllFaqs] = useState([]);
  // console.log(allFaqs);

  const handleGetAll = async () => {
    try {
      const res = await Axios.get(`${API_URL}/faqs`);
      if (res) {
        setAllFaqs(res.data);
      } else {
        alert(`Faqs not found`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };
  useEffect(() => {
    handleGetAll();
  }, []);

  // -------------------------------delete------------------------------
  const [delInfo, setDelInfo] = useState([]);

  return (
    <main className="afaqs-container">
      <AHeader hMain="FAQs" hSub="Faqs" hID="#aeFaqs" setComp={setComp} />

      <section className="content-container m-0 p-0 mx-5 my-3">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Optional</th>
            </tr>
          </thead>
          {allFaqs.map((faq, idx) => (
            <tbody key={idx}>
              <tr>
                <td>{idx + 1}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td className="btn-container">
                    <button
                        data-bs-toggle='modal'
                        data-bs-target='#aeFaqs'
                        onClick={() => [setOldInfo(faq), setComp("edit")]}
                    >
                        <ion-icon name="create-outline"></ion-icon>
                    </button>
                    <button
                        data-bs-toggle='modal'
                        data-bs-target='#delFaq'
                        onClick={() => setDelInfo(faq)}
                    >
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>

      {/* Modal - Add/Edit *Faqs */}
      <section className="form-add-Faqs">
        <ModalAE_Faqs
          modalAEID="aeFaqs"
          modalAEComp={comp}
          modalAEOldInfo={oldInfo}
        />
      </section>

      {/* Modal - Del *Faq */}
      <section className="form-del-faqs">
            <ModalDel 
                modalDelID='delFaq'
                modalDelTitle='Faq'
                modalDelContent={delInfo}
                modalDelPath='faqs'
            />
        </section>

    </main>
  );
};

export default AFaqs;
