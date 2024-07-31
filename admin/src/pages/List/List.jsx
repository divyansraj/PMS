import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { myURL } from "../../utils/constant";

const List = () => {
  const [list, setList] = useState([]);

  // Function to fetch user details
  const assignedUser = async (userId) => {
    try {
      const response = await axios.post(myURL + "/api/user/oneuser", {
        userId,
      });
      if (response.data.success) {
        return response.data.user.name; // Assuming the response has user details including name
      } else {
        //toast.error("Failed to fetch user details.");
        return "Unknown User";
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return "Unknown User";
    }
  };

  // Function to fetch all food items
  const items = async () => {
    try {
      const response = await axios.get(`${myURL}/api/food/allfooditems`);
      if (response.data.success) {
        const foodList = response.data.food;

        // Fetch user details for each food item
        const updatedFoodList = await Promise.all(
          foodList.map(async (item) => {
            const userName = await assignedUser(item.user);
            return { ...item, userName }; // Add userName to each item
          })
        );

        setList(updatedFoodList);
        
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    items();
  }, []);

  // Function to remove a food item
  const removefooditem = async (foodId) => {
    try {
      const response = await axios.delete(myURL + "/api/food/delete", {
        data: { id: foodId },
      });
      await items(); // Refresh the list after deletion
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const statusHandler = async(event,projectId)=> {
    const response = await axios.post(myURL + "/api/food/status",{projectId,status:event.target.value});
    if(response.data.success){
      await items();
    }
    console.log(list);
  }
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 bg-white rounded-md shadow-md">
        <p className="font-semibold col-span-1">Name</p>
        <p className="font-semibold col-span-1">Description</p>
        <p className="font-semibold col-span-1">Assigned User</p>
        <p className="font-semibold col-span-1">Category</p>
        <p className="font-semibold col-span-1">Due Date</p>
        <p className="font-semibold col-span-1">Status</p>
        <div className="font-semibold col-span-1 flex justify-end items-center">
          Action
        </div>
      </div>
      {list.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 bg-white rounded-md shadow-md mt-4 items-center"
        >
          <div className="col-span-1 flex flex-col">
            <img
              src={item.image.secure_url}
              alt="food-item"
              className="w-24 h-24 object-cover rounded-md"
            />
            <p className="mt-2 md:mt-0 md:ml-4">{item.name}</p>
          </div>
          <p className="col-span-1">{item.description}</p>
          <p className="col-span-1">{item.userName}</p> {/* Display userName */}
          <p className="col-span-1">{item.category}</p>
          <p className="col-span-1">
            {new Date(item.duedate).toLocaleDateString()}
          </p>{" "}
          <p className="col-span-2 md:col-span-1 flex justify-end items-center">
            <select
              onChange={(e) => statusHandler(e, item._id)}
              value={item.status}
            >
              <option value="Pending">Pending</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </p>
          <div className="col-span-1 flex justify-end items-center">
            <IoIosClose
              className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => removefooditem(item._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
