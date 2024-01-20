import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NavBar from './components/NavBar.jsx'
import LoginForm from './components/LoginForm.jsx'
import HomePage from './pages/HomePage.jsx'
import { BrowserRouter} from "react-router-dom";
import BatchModal from './components/batches/BatchModal.jsx'
import Conformation from './components/globlecomponent/Conformation.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    {/* <NavBar/> */}
    {/* <LoginForm/> */}
    {/* <HomePage/> */}
    {/* <BatchModal/> */}
    {/* <Conformation/> */}
    
  </BrowserRouter>,
)
