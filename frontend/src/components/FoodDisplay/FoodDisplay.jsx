/* eslint-disable no-unused-vars */
//import React from "react";
import { useSelector } from "react-redux";
import FoodItem from "../FoodItem/FoodItem";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myURL } from "../../utils/constants";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = () => {
  const category = useSelector((store) => store.foodcategory.selectedCategory);
  const { food_list, fetchFoodList, getTotalCartValues, loadCartItems } =
    useContext(StoreContext);

    const token = useSelector((store) => store.auth.token);
  const [loginUser, setLoginUser] = useState({});
    const useDetails = async () => {
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
        useDetails();
      }
    }, [token]);
  // const total = useSelector((store) => store.menu.total)
  // const [food,setFood]=useState([]);
  // const fetchFood = async() => {
  //   const response = await axios.get(myURL + "/api/food/allfooditems");
  //   setFood(response.data.food);
  // }

  // console.log(food);
  return (
    <div className="container mx-auto px-5 py-10 relative" id="food-display">
      <div className="max-w-[1280px] mx-auto relative">
        <h1 className="font-medium text-2xl mb-5">My project list</h1>
        <div className="flex flex-col gap-10">
          {food_list
            .filter((item) => category === "All" || item.category === category)
            .map((item, index) =>{
              if(loginUser._id == item.user && token){
                return (
                  <div key={item._id}>
                    <FoodItem
                      key={index}
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      duedate={item.duedate}
                      image={item.image}
                      status={item.status}
                    />
                  </div>
                );
              }
            }
              
            )}
        </div>
        
      </div>
    </div>
  );
};

export default FoodDisplay;
