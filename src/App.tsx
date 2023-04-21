import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Payment from './components/Payment';
import ProtectedRoute from './components/ProtectedRoute';


const App: React.FunctionComponent = () => {

  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<ProtectedRoute child={Home}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/welcome/:id' element={<Welcome />} />
        <Route path='/payment' element={<ProtectedRoute child={Payment}/>} />
      </Routes>
    </Router>
    
  )
}

export default App
