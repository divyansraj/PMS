/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import { myURL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, duedate, description, image, status }) => {
  const token = useSelector((store) => store.auth.token);

  // Function to handle status change
  const statusHandler = async (event, projectId) => {
    try {
      const response = await axios.post(myURL + "/api/food/status", {
        projectId,
        status: event.target.value,
      });
      if (response.data.success) {
        // Optionally, you can update the UI state without page refresh
        // setCurrentStatus(event.target.value);
        window.location.reload(); // Refresh the page after status update
      } else {
        console.error("Failed to update status:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Access cart items from context if needed
  // const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="flex w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image */}
      <div className="w-48 h-48 relative">
        <img
          src={image.secure_url}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg">Title: {name}</span>
        </div>

        {/* Description */}
        <div className="text-gray-700 text-sm mb-4">{description}</div>

        {/* Due Date */}
        <div className="text-sm mb-2">
          Due Date: {new Date(duedate).toLocaleDateString()}
        </div>

        {/* Status */}
        <div className="flex items-center">
          <p className="mr-3">Status:</p>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            onChange={(e) => statusHandler(e, id)}
            value={status}
          >
            <option value="Pending">Pending</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
