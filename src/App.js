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
          {/* Route for the homepage */}
          <Route path="/" exact element={<><Navbar /><Homepage /></>} />

          {/* Route for the teacher login */}
          <Route path="/login" exact element={<><TeacherLogin /></>} />

          {/* Route for the teacher registration */}
          <Route path="/register" exact element={<><TeacherRegister /></>} />

          {/* Route for creating a new student */}
          <Route path="/studentDetail" exact element={<><Navbar /><CreateStudent /></>} />

          {/* Route for displaying all student records */}
          <Route path="/allRecords" exact element={<><Navbar /><AllRecords /></>} />

          {/* Route for updating a student record */}
          <Route path="/updateStudent/:id" exact element={<><Navbar /><UpdateStudent /></>} />

          {/* Route for handling any unknown paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
