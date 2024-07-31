import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr className="w-full h-[2px] bg-gray-300" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <SideBar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
