import { configureStore } from "@reduxjs/toolkit";
import FoodCategorySlice from "./FoodCategorySlice";
import FoodMenuSlice from "./FoodMenuSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    foodcategory: FoodCategorySlice,
    menu: FoodMenuSlice,
    auth: AuthSlice,
  },
});

export default store;