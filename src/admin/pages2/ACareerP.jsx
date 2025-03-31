import React, { useEffect, useState } from "react";
import Axios from 'axios'

import AHeader from "../components/AHeader";
import ModalAE_CareerP from "../components/ModalAE_CareerP";
import ModalDel from '../../components/ModalDel'

const API_URL = import.meta.env.VITE_API_URL;

const ACareerP = () => {
  // -------------------------------get-all------------------------------
  const [allCareers, setAllCareers] = useState([]);
  const getAll = async () => {
    try{
      const res = await Axios.get(`${API_URL}/careerPath`);
      
      if(res){
        setAllCareers(res.data);
      } else {
        alert(`Not found career.`)
      }

    } catch(err){
      alert(`Internal server ${err}`);
    }
  }

  useEffect(() => {
    getAll();
  }, [])

  // -------------------------------insert *new (AE_MODAL)------------------------------
  const [comp, setComp] = useState("");
  const [oldInfo, setOldInfo] = useState([]);

  // -------------------------------delete------------------------------
  const [delInfo, setDelInfo] = useState([]);

  return (
    <main className="act_carp-container">
      {/* Header */}
      <AHeader
        hMain="CAREER PATHs"
        hSub="Career Path"
        hID="#aeCaeerP"
        setComp={setComp}
      />

      <article className="content-container row m-0">
        {allCareers.map((career, idx) => (
          <section className="comp-container col-sm-6 col-md-3" key={idx}>
            <section className="comp-card comp-card-careeep">
              <ion-icon name={career.icon}></ion-icon>
              <h1 className="topic topic-careerp">{career.topic}</h1>
              <p className="desc">{career.description}</p>

              <section className="btn-container">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#aeCaeerP"
                  onClick={() => [setComp("edit"), setOldInfo(career)]}
                >
                  Edit, This career
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#deleteCareer"
                  onClick={() => setDelInfo(career)} 
                >
                  Delete, This career
                </button>
              </section>
            </section>
          </section>
        ))}
      </article>

      {/* Modal - Add/Edit Career Path */}
      <section className="form-add-careerP">
        <ModalAE_CareerP
          modalAEID="aeCaeerP"
          modalAEComp={comp}
          modalAEOldInfo={oldInfo}
        />
      </section>

      {/* Modal - Del Career Path */}
      <section className="form-add-activities">
            <ModalDel 
                modalDelID='deleteCareer'
                modalDelTitle='Career Path'
                modalDelContent={delInfo}
                modalDelPath='careerPath'
            />
        </section>
    </main>
  );
};

export default ACareerP;
