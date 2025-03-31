import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

const AShowcase = () => {
    // Get *Showcase
    const [showcase, setShowcase] = useState([]);
    // console.log(showcase);
    const handleShowcase = async () => {
        try{
            const res = await Axios.get(`${API_URL}/studentShowcase`);
            if(res.status === 200){
                setShowcase(res.data);
            } else {
                alert(`Error to get *Showcase, [Check/Log]`);
                return;
            }

        } catch(err){
            alert(`Internal server ${err.message}`);
        }
    };

    useEffect(() => {
        handleShowcase();
    }, [])

    // Put Status (Approved)
    const handleApprove = async ({id}) => {
        try{
            console.log(id)
            const res = await Axios.put(`${API_URL}/studentShowcase/status/${id}`, {status: "Approved"});
            if(res.status === 200){
                alert(`Approve Successful.`)
                location.reload();
            } else {
                alert(`Approve Failed.`)
                location.reload();
            }
        } catch(err){
            alert(`Internal server ${err.message}`);
        }
    }
    
  return (
    <main className='a-showcase-container'>
        <article className="content-container row m-0">
            {showcase.map((showcaseItem, idx) => (
                <section key={idx} className='col-md-3'>
                    <section className='content-card'>
                        <button 
                            className={`btn btn-approve
                                ${showcaseItem.status === "Approved" ? "Approved" : ""} `
                            } 
                           onClick={() => handleApprove({id: showcaseItem.id})}
                        >   
                            {showcaseItem.status === "Approved" ? "Approved" : "Approve"}
                        </button>

                        <img 
                            className='content-img'
                            src={`${API_URL}/images/stu_showcase/${showcaseItem.image}`}
                            alt={showcaseItem.topic}
                        />
                        <section className="content-text">
                            <h1 className="topic">{showcaseItem.topic}</h1>
                            <p className="desc">{showcaseItem.description}</p>
                        </section>
                        
                        <section className="content-btn">
                            <button
                                className='btn btn-edit'
                            >
                                Edit, Case
                            </button>
                            <button
                                className='btn btn-delete'
                            >
                                Delete, Case
                            </button>
                        </section>
                    </section>
                </section>
            ))}
        </article>
    </main>
  )
}

export default AShowcase