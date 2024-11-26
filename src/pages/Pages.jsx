import React from 'react'
import Home from './Home';
import Contact from './Contact';
import { Routes, Route } from 'react-router-dom';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default Pages
