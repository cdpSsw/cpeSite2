import React, { useEffect, useState } from "react";
import Axios from "axios";

import {Swiper, SwiperSlide} from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/scss'
import 'swiper/scss/pagination'

import AHeader from "../components/AHeader";
import ModalAE_Tools from "../components/ModalAE_Tools";
import ModalDel from '../../components/ModalDel'

const API_URL = import.meta.env.VITE_API_URL;

const ABorrowReturn = () => {

const [selectedImg, setSelectedImg] = useState(null);

  // -------------------------------insert *new (AE_MODAL)------------------------------
  const [comp, setComp] = useState("");
  const [oldInfo, setOldInfo] = useState([]);

  // all tools
  const [tools, setTools] = useState([]);
  // console.log(tools);

  const handleTools = async () => {
    try{
        const res = await Axios.get(`${API_URL}/tools`);
        if(res.status === 200){
            setTools(res.data); 
        } else {
            alert(`Getting *tools faild.`);
        }
    } catch(err){
        alert(`Internal server ${err}`);
    }
  }
  useEffect(() => {
    handleTools();
  }, [])

  return (
    <main className="borrow-return-container">

      <AHeader
        hMain="Borrw Returns"
        hSub="Borrw Return"
        hID="#aeTools"
        setComp={setComp}
      />

      {/* Modal - Add/Edit Activities */}
      <section className="form-add-activities">
        <ModalAE_Tools
          modalAEID="aeTools"
          modalAEComp={comp}
          modalAEOldInfo={oldInfo}
        />
      </section>

      {/* Modal - Del *New Activities */}
      {/* <section className="form-add-activities">
        <ModalDel
          modalDelID="deleteActivities"
          modalDelTitle="Activities"
        //   modalDelContent={delInfo}
          modalDelPath="activities"
        />
      </section> */}

      <article className="content-container row m-0">
        {tools.map((tool, idx) => (
            <section key={idx} className="tool-card col-md-3">
                <Swiper>
                    <SwiperSlide>
                        <img 
                            src={`${API_URL}/images/tools/${tool.img1}`} alt="" 
                            onClick={() => setSelectedImg(`${API_URL}/images/tools/${tool.img1}`)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img 
                            src={`${API_URL}/images/tools/${tool.img2}`} alt="" 
                            onClick={() => setSelectedImg(`${API_URL}/images/tools/${tool.img2}`)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img 
                            src={`${API_URL}/images/tools/${tool.img3}`} alt="" 
                            onClick={() => setSelectedImg(`${API_URL}/images/tools/${tool.img3}`)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img 
                            src={`${API_URL}/images/tools/${tool.img4}`} alt="" 
                            onClick={() => setSelectedImg(`${API_URL}/images/tools/${tool.img4}`)}
                        />
                    </SwiperSlide>
                </Swiper>
                <h1 className="tool-quantity">{tool.available > 0 ? `Available ${tool.available} / ${tool.quantity}` : 'Out of Stock'}</h1>
                <h1 className="tool-name">{tool.name}</h1>
                <h1 className="tool-desc">{tool.description}</h1>
            </section>
        ))}
      </article>

      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <img
              src={selectedImg}
              alt="Original Image"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ABorrowReturn;
