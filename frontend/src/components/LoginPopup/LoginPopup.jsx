import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { setToken, setisLoggedIn } from "../../utils/AuthSlice";
import { myURL } from "../../utils/constants";
import axios from "axios";

const LoginPopup = () => {
  // const showLoginPopup = useSelector((store) => store.auth.isLoggedIn);

  const auth = useSelector((store) => store.auth.token);
  console.log(auth);
  const dispatch = useDispatch();
  const [currState, setcurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSubmitHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const login = async (e) => {
    e.preventDefault();
    let response;
    if (currState === "Login") {
      response = await axios.post(`${myURL}/api/user/login`, data);

    } else {
      response = await axios.post(`${myURL}/api/user/register`, data);
    }
    console.log(response)
    if (response.data.success) {
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      dispatch(setisLoggedIn(false));
    } else {
      alert(response.data.message);
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleClick = () => {
    dispatch(setisLoggedIn(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 mt-10">
      <form
        onSubmit={login}
        className="relative bg-white p-7 rounded-lg w-full max-w-sm mx-4 space-y-6 text-gray-800"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">{currState}</h1>
          <img
            onClick={handleClick}
            src={assets.cross_icon}
            alt="close"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <div className="flex flex-col space-y-4">
          {currState === "Sign up" && (
            <input
              name="name"
              value={data.name}
              onChange={onSubmitHandler}
              className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
              type="text"
              placeholder="Enter your name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onSubmitHandler}
            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onSubmitHandler}
            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            required
            className="form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out"
          />
          <p className="text-sm">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p className="text-sm">
            Create a new account?{" "}
            <span
              onClick={() => setcurrState("Sign up")}
              className="text-orange-500 cursor-pointer font-semibold text-[16px] hover:text-orange-700"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?
            <span
              onClick={() => setcurrState("Login")}
              className="text-orange-500 cursor-pointer font-semibold text-[16px] ml-2 hover:text-orange-700"
            >
              Login
            </span>
          </p>
        )}
        <button
          className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-200"
          type="submit"
        >
          {currState}
        </button>
      </form>
    </div>
  );
};

export default LoginPopup;
