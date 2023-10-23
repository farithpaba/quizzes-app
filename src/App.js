import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './screens/Login'
import HomeAdmin from './screens/HomeAdmin'
import { useState } from 'react';
import Grades from './screens/Grades';
import Students from './screens/Students';
import ModuleEdit from './screens/ModuleEdit';
import QuizEdit from './screens/QuizEdit';
import SectionEdit from './screens/SectionEdit';
import Preview from './screens/Preview';
import { useSelector } from "react-redux";
import { selectGlobalUser } from './redux/newGlobalUserSlice';
import HomeStudent from './screens/Student/HomeStudent'
import ModuleStudent from './screens/Student/ModuleStudent'
import PreExam from './screens/Student/PreExam'
import Quiz from './screens/Student/Quiz';

function App() {

  const user = useSelector(selectGlobalUser);


  return <>{user !== "login" ?
    <BrowserRouter  >
      {user === "admin" ?
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/students" element={<Students />} />
          <Route path="/moduleEdit" element={<ModuleEdit />} />
          <Route path="/quizEdit" element={<QuizEdit />} />
          <Route path="/sectionEdit" element={<SectionEdit />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<HomeStudent />} />
          <Route path="/module" element={<ModuleStudent />} />
          <Route path="/preExam" element={<PreExam />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      }

    </BrowserRouter>
    : <Login />}</>;
}

export default App;
