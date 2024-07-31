import { createSlice } from "@reduxjs/toolkit";

const FoodCategorySlice = createSlice({
  name: "foodcategory",
  initialState: {
    selectedCategory : "All",
  },
  reducers: {
    setFoodCategory: (state, action) => {
      if(state.selectedCategory == action.payload){
        state.selectedCategory = "All";
      }
      else{
        state.selectedCategory = action.payload;
      }
    },
  },
});
export const { setFoodCategory } = FoodCategorySlice.actions;
export default FoodCategorySlice.reducer;