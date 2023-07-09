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
import NotFound from './components/NotFound';

function App() {
  let token = sessionStorage.getItem("token");
  let isToken = false;
  if (token) {
    isToken = true;
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<><Navbar /><Homepage /></>} />
          <Route path="/login" exact element={<><TeacherLogin /></>} />
          <Route path="/register" exact element={<><TeacherRegister /></>} />


          <Route path="/studentDetail" exact element={<><Navbar /><CreateStudent /></>} />
          <Route path="/allRecords" exact element={<><Navbar /><AllRecords /></>} />
          <Route path="/updateStudent/:id" exact element={<><Navbar /><UpdateStudent /></>} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
