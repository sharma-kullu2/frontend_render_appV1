import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from './components/Blog/Blog'
import Nav from './components/Blog/Nav'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/nav" element={<Nav />} />
      </Routes>
    </div>
  );
}
