import React, { useEffect, useState } from 'react'
import Axios from 'axios';

import AHeader from '../components/AHeader';
import ModalAE_Activities from '../components/ModalAE_Activities';
import ModalDel from '../../components/ModalDel'

const API_URL = import.meta.env.VITE_API_URL;

const AActivities = () => {

    // -------------------------------insert *new (AE_MODAL)------------------------------
    const [comp, setComp] = useState("");
    const [oldInfo, setOldInfo] = useState([]);

    // -----------------------------get all & get selected------------------------------
    const [allActivities, setAllActivities] = useState([]);
    // console.log(allActivities);
    
    const handleGetAll = async() => {
        try{
            const res = await Axios.get(`${API_URL}/activities`);
            if(res){
                setAllActivities(res.data);
            } else {
                alert(`Activities not found`);
            }

        } catch(err) {
            alert(`Internal server error: ${err}`);
        }
    }
    useEffect(() => {
        handleGetAll();
    }, [])

    // -------------------------------delete------------------------------
    const [delInfo, setDelInfo] = useState([]);

  return (
    <main className='act_carp-container'>
        <AHeader 
            hMain='ACTIVITIEs'
            hSub='Activities'
            hID='#aeActivities'
            setComp={setComp}
        />

        <article className="content-container row m-0">
                {allActivities.map((activities, idx) => (
                    <section className="comp-container col-sm-6 col-md-3" key={idx}>
                        <section className='comp-card'>
                            <img src={`${API_URL}/images/activities/${activities.poster}`} alt={activities.topic} />
                            <h1 className='topic'>{activities.topic}</h1>
                            <p className='desc'>{activities.description}</p>

                            <section className="btn-container">
                                <button
                                    data-bs-toggle='modal'
                                    data-bs-target='#aeActivities'
                                    onClick={() =>[ 
                                        setComp("edit"),
                                        setOldInfo(activities)
                                    ]}
                                >Edit, This Activities</button>
                                <button
                                    data-bs-toggle='modal'
                                    data-bs-target='#deleteActivities'
                                    onClick={() => setDelInfo(activities)}
                                >Delete, This Activities</button>
                            </section>
                        </section>
                    </section>
                ))}
        </article>
        
        {/* Modal - Add/Edit Activities */}
        <section className="form-add-activities">
            <ModalAE_Activities 
                modalAEID='aeActivities'
                modalAEComp={comp}
                modalAEOldInfo={oldInfo}
            />
        </section>
        
        {/* Modal - Del *New Activities */}
        <section className="form-add-activities">
            <ModalDel 
                modalDelID='deleteActivities'
                modalDelTitle='Activities'
                modalDelContent={delInfo}
                modalDelPath='activities'
            />
        </section>
        
    </main>
  )
}

export default AActivities