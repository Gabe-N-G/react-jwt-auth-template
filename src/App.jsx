import { useState,useEffect,createContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { getUser, signOut } from './services/authService.js'

import NavBar from './components/NavBar/NavBar.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Landing from './components/Landing/Landing.jsx'
import SignupForm from './components/SignupForm/SignupForm.jsx'
import SigninForm from './components/SigninForm/SigninForm.jsx'

export const AuthedUserContext =  createContext(null)

const App = () => {
    const [user, setUser] = useState(null)
    
  useEffect (()=>{
    const userData = getUser()
    setUser(userData)
  },[])

  const handleSignout = () => {
    signOut();
    setUser(null);
  };

    return (
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard user={user} />}/> 
          ) : (
            <Route path="/"  element={<Landing/>}/> 
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser}/>}/>
          <Route path="/signin" element={<SigninForm setUser={setUser}/>}/>
        </Routes>
        </AuthedUserContext.Provider>    
      )
  }
  
  export default App