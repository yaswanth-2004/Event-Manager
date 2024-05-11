import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '../components/Home.jsx'
import { BrowserRouter as  Router,Routes,Route } from 'react-router-dom'
import StudentLogin from '../components/StudentLogin.jsx'
import TeachLogin from '../components/TeachLogin.jsx'
import EventDetails from '../pages/EventDetail.jsx'
import ParticipantsDetail from '../pages/ParticipantsDetail.jsx'
import Register from '../pages/Register.jsx'
import TeachEvents from '../pages/TeacherEvents.jsx'
import ParticipantDisplay from '../pages/ParticipantDisplay.jsx'
import AdminEvent from '../pages/AdminEvent.jsx'
import CentralLogin from '../components/Central.jsx'
import CentralEvent from '../pages/CentralEvent.jsx'



function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<StudentLogin/>} path='/studentlogin' />
          <Route element={<TeachLogin/>} path='/teachlogin' />
          <Route element={<EventDetails/>}path='/eventdetails'/>
          <Route element={<ParticipantsDetail/>} path='/participantsdetail'/>
          <Route element={<Register/>} path='/register'/>
          <Route element={<TeachEvents/>} path='/teacherevents'/>
          <Route element={<ParticipantDisplay/>} path='participantdisplay' />
          <Route element={<AdminEvent/>} path='adminevent' />
          <Route element={<CentralLogin/>} path='centrallogin'/>
          <Route element={<CentralEvent/>} path='centralevents'/>

        </Routes>
      </Router>
        
    </div>
  )
}

export default App
