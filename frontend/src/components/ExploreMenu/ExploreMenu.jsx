import React, { useState, useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setFoodCategory } from "../../utils/FoodCategorySlice";

const ExploreMenu = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (store) => store.foodcategory.selectedCategory
  );
  const [currCategory, setCurrCategory] = useState(selectedCategory);
  const menuRef = useRef(null);

  const handleCategoryClick = (category) => {
    if (currCategory === category) {
      dispatch(setFoodCategory("All"));
      setCurrCategory("All");
    } else {
      dispatch(setFoodCategory(category));
      setCurrCategory(category);
    }
  };

  const scrollLeft = () => {
    menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col gap-5 px-4">
      <h1 className="text-[#262626] font-semibold text-3xl">
        Projects
      </h1>
      <div className="relative flex items-center">
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
        >
          &lt;
        </button>
        <div
          ref={menuRef}
          className="explore-menu-list flex gap-10 flex-nowrap justify-between items-center text-center my-5 mx-0 overflow-x-scroll whitespace-nowrap scrollbar-hide"
        >
          {menu_list.map((item, index) => (
            <div
              onClick={() => handleCategoryClick(item.menu_name)}
              key={index}
              className="flex-shrink-0 cursor-pointer"
            >
              <img
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${
                  currCategory === item.menu_name
                    ? "border-red-500"
                    : "border-transparent"
                }`}
                src={item.menu_image}
                alt="menu-item"
              />
              <h1 className="mt-2">{item.menu_name}</h1>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ExploreMenu;
