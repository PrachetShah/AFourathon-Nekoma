import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

import Homepage from './pages/homepage/Homepage';
import TeacherLogin from './auth/TeacherLogin';
import TeacherRegister from './auth/TeacherRegister';
import Navbar from './components/Navbar/Navbar';
import CreateStudent from './pages/teacher/CreateStudent';
import AllRecords from './pages/teacher/AllRecords';
import UpdateStudent from './pages/teacher/components/UpdateStudent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/home" exact element={<><Navbar/><Homepage/></>} />
        <Route path="/" exact element={<><TeacherLogin/></>} />
        <Route path="/register" exact element={<><TeacherRegister/></>} />
        <Route path="/studentDetail" exact element={<><Navbar/><CreateStudent/></>} />
        <Route path="/allRecords" exact element={<><Navbar/><AllRecords/></>} />
        <Route path="/updateStudent/:id" exact element={<><Navbar/><UpdateStudent /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
