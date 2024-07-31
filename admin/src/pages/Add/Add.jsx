import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { myURL } from "../../utils/constant";

const Add = () => {
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(myURL + "/api/user/allusers");
      if (response.data.success) {
        setUsers(response.data.user || []); // Ensure users is an array
        console.log(response.data.user);
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Web Development",
    duedate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("user", selectedUser);
    formData.append("duedate", data.duedate);
    try {
      
      const response = await axios.post(myURL + "/api/food/add", formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Web Development",
          duedate: "",
        });
        setImage(null);
        setSelectedUser("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the project.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form
        className="flex flex-col gap-6 max-w-2xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-lg font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
            <label
              htmlFor="image"
              className="cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-400 p-4 rounded-md"
            >
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload"
                className="w-24"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Project Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={data.name}
            placeholder="Type here"
            className="border-2 border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">
            Project Description
          </label>
          <textarea
            name="description"
            placeholder="Type here"
            onChange={handleChange}
            value={data.description}
            rows="4"
            className="border-2 border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-lg font-semibold mb-2">
              Project Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              value={data.category}
              className="border-2 border-gray-300 p-2 rounded-md"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Game Development">Game Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-lg font-semibold mb-2">Assign to User</label>
          <select
            name="user"
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
            className="border-2 border-gray-300 p-2 rounded-md"
            required
          >
            <option value="">Select a user</option>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-lg font-semibold mb-2">Due Date</label>
          <input
            type="date"
            name="duedate"
            onChange={handleChange}
            value={data.duedate}
            className="border-2 border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
