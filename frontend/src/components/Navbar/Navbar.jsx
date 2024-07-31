import { useState, useEffect, useContext, useRef } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSmileFill } from "react-icons/ri";
import { MdMarkEmailUnread } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setisLoggedIn } from "../../utils/AuthSlice";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { myURL } from "../../utils/constants";

const Navbar = () => {
  const { getTotalCartValues, setCartItems, food_list } =
    useContext(StoreContext);
  const [underline, setUnderline] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      dispatch(setToken(tokenFromStorage));
    }
  }, [dispatch]);

  // Getting user details
  const [loginUser, setLoginUser] = useState({});

  const userDetails = async () => {
    const response = await axios.post(
      myURL + "/api/user/userdetails",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setLoginUser(response.data.user);
    }
  };

  useEffect(() => {
    if (token) {
      userDetails();
    }
  }, [token]);

  // Handle outside click to close profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken("")); // Clear token in Redux store
    dispatch(setisLoggedIn(false)); // Update isLoggedIn in Redux store
    setLoginUser({});
    setCartItems({});
    navigate("/");
  };

  const handleClick = () => {
    dispatch(setisLoggedIn(true));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="bg-gradient fixed w-full z-50">
      <div className="flex gap-5 justify-between max-w-[1280px] mx-auto px-4 md:px-0">
        <Link to={"/"}>
          <img src={assets.logo} alt="Logo" className="w-[100px]" />
        </Link>

        <div className="hidden md:flex items-center gap-5 text-white">
          <ul className="flex items-center gap-5 cursor-pointer">
            <Link
              to={"/"}
              onClick={() => setUnderline("home")}
              className={underline === "home" ? "active" : ""}
            >
              Home
            </Link>
            <Link
              to={"/menu"}
              href="#explore-menu"
              onClick={() => setUnderline("menu")}
              className={underline === "menu" ? "active" : ""}
            >
              Projects
            </Link>
          </ul>

          <div className="relative flex items-center gap-5">
            {!token ? (
              <button
                onClick={handleClick}
                className="py-2 px-4 text-white font-semibold bg-[#f54748] rounded-md border-2 border-stone-200 duration-100 hover:border-zinc-600"
              >
                Sign in
              </button>
            ) : (
              <>
                <div>{loginUser.name}</div>
                <div className="relative" ref={profileMenuRef}>
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    onClick={toggleProfileMenu}
                    className="cursor-pointer border border-1 rounded-full p-1"
                  />
                  {isProfileMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-50 bg-white rounded-md shadow-lg text-black">
                      <li className="flex gap-2 px-4 py-2 items-center cursor-text">
                        <RiUserSmileFill />
                        {loginUser.name}
                      </li>
                      <li className="flex gap-2 px-4 py-2 items-center cursor-text ">
                        <MdMarkEmailUnread />
                        {loginUser.email}
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={Logout}
                      >
                        <IoLogOut />
                        <span>Logout</span>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
