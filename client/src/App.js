import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/landing';
import Home from './pages/home';
import { userContext } from './components/userContext';
import TitleBar from './components/titleBar';
import AddItem from './pages/addToLog'
import Navbar from './components/navbar';

function App() {
  const [activeUser, setActiveUser] = useState({id:null,name:null});

  return (
    <Router>
      <div className="App">
        <userContext.Provider value={[activeUser, setActiveUser]}>
        <TitleBar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        {activeUser.id && <Navbar />}
        </userContext.Provider>
        
      </div>
    </Router>
  )

}

export default App;
