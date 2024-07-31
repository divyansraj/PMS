import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { myURL } from "../utils/constants";
import { useSelector } from "react-redux";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const token = useSelector((store) => store.auth.token);

  const loadData = async () => {
    await fetchFoodList();
    const localStorageToken = localStorage.getItem("token");

  };

  useEffect(() => {
    loadData();
  }, [token]);



  const fetchFoodList = async () => {
    const response = await axios.get(myURL + "/api/food/allfooditems");
    setFoodList(response.data.food);
  };



  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
