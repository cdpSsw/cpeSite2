import React from 'react'

import '../public/main.css';

import Nav from './components/Nav'
import Header from './homeComp/Header';
import Activities from './homeComp/Activities';
import Highlight from './homeComp/Highlight';
import Course from './homeComp/Course';
import Team from './homeComp/Team';
import CareerP from './homeComp/CareerP';
import Faqs from './homeComp/Faqs';

const Homepages = () => {
  return (
    <>
      <Nav/>
      <Header />
      <Activities />
      <Highlight />
      <Course />
      <Team />
      <CareerP />
      <Faqs />
    </>
  )
}

export default Homepages