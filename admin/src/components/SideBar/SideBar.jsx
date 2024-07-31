import { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [active, setActive] = useState("");

  return (
    <div className="p-6 bg-gray-100 h-full md:w-1/4 lg:w-1/5 shadow-lg">
      <div className="flex flex-col gap-6">
        <Link
          to="/"
          onClick={() => setActive("add")}
          className={`flex items-center gap-2 p-3 rounded transition-colors ${
            active === "add" ? "bg-gray-200" : "bg-white"
          }`}
        >
          <img src={assets.add_icon} alt="Add Items" className="w-6 h-6" />
          <h1 className="text-lg">Add Items</h1>
        </Link>
        <Link
          to="/list"
          onClick={() => setActive("list")}
          className={`flex items-center gap-2 p-3 rounded transition-colors ${
            active === "list" ? "bg-gray-200" : "bg-white"
          }`}
        >
          <img src={assets.order_icon} alt="List Items" className="w-6 h-6" />
          <h1 className="text-lg">List Items</h1>
        </Link>
        {/* <Link
          to="/orders"
          onClick={() => setActive("orders")}
          className={`flex items-center gap-2 p-3 rounded transition-colors ${
            active === "orders" ? "bg-gray-200" : "bg-white"
          }`}
        >
          <img src={assets.order_icon} alt="Orders" className="w-6 h-6" />
          <h1 className="text-lg">Orders</h1>
        </Link> */}
      </div>
    </div>
  );
};

export default SideBar;
