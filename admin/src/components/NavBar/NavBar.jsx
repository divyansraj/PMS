import "./NavBar.css";
import { RiAdminFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full z-50 shadow-md">
      <div className="flex py-4 gap-5 justify-between items-center max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-2xl text-white">Admin Panel</h1>
        </div>
        <RiAdminFill size={36} className="text-white" />
      </div>
    </div>
  );
};

export default NavBar;
