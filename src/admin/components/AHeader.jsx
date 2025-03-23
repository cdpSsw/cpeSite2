import React from 'react'

const AHeader = ({ hMain, hSub, hID, setComp }) => {
  return (
    <header className='head-container'>
        <button
            className='add-new-btn'
            data-bs-toggle='modal'
            data-bs-target={hID}
            onClick={() => setComp("add")}
        >
            <ion-icon name="add-outline"></ion-icon>
            Add New
        </button>
        <h1 className='head-title'>{hMain}</h1>
        <h5 className='sub-title'>
            Home 
            <ion-icon name="chevron-forward-outline"></ion-icon> 
            <span>{hSub}</span>
        </h5>
    </header>
  )
}

export default AHeader