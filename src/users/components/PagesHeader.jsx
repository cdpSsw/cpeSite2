import React from 'react'

const PagesHeader = ({main_title, sub_title}) => {
  return (
    <main className='p-header-container'>
        <h1 className="main-title">{main_title}s</h1>
        <p className='sub-title'>Home &gt; <span>{sub_title}</span></p>
    </main>
  )
}

export default PagesHeader