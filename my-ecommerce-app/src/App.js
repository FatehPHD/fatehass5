import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import LoginPage from './components/LoginPage.js';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Products" element={<Productpage />} />   
          <Route path="/Login" element={<LoginPage />} />    
        </Routes>
      </div>
    </Router>
  );
};

export default App;
