//import React from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

import Home from "./pages/Home/Home"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import { useSelector } from "react-redux"
import Menu from "./pages/Menu/Menu"
import ContactUs from "./pages/Contactus/Contactus"

const App = () => {
  const showLogin = useSelector((store) => store.auth.isLoggedIn);
  return (
    <>
      {showLogin ? <LoginPopup /> : <></>}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path={'/contactus'} element={<ContactUs/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App