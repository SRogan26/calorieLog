// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/landing';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  )

}

export default App;
