import { useState, useEffect } from "react";
import axios from "axios";
import { myURL } from "../../utils/constant";

const Order = () => {
  const [orderlist, setOrderlist] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(myURL + "/api/order/allorders");
    setOrderlist(response.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statusHandler = async(event,orderId)=> {
    const response = await axios.post(myURL + "/api/order/status",{orderId,status:event.target.value});
    if(response.data.success){
      await fetchOrders();
    }
  }
  console.log(orderlist)
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4 bg-white p-4 rounded shadow">
        <p className="font-semibold col-span-2 md:col-span-1">Name</p>
        <p className="font-semibold col-span-2 md:col-span-2">
          Delivery Information
        </p>
        <p className="font-semibold col-span-2 md:col-span-2">Items</p>
        <p className="font-semibold col-span-1 md:col-span-1">Price</p>
        <p className="font-semibold col-span-2 md:col-span-1 flex justify-end items-center">
          Status
        </p>
      </div>
      {orderlist.map((item) => (
        <div key={item._id} className="mb-4 bg-white p-4 rounded shadow">
          <div className="mb-2 flex justify-between">
            <p className="font-semibold">Order ID: {item._id}</p>
            <p className="font-semibold">Order Date: {formatDate(item.date)}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <p className="col-span-2 md:col-span-1">
              {item.address.firstName} {item.address.lastName}
            </p>
            <p className="col-span-2 md:col-span-2">
              {item.address.street}, {item.address.city}, {item.address.state},{" "}
              {item.address.zipCode}
            </p>
            <div className="col-span-2 md:col-span-2">
              {item.items.map((each) => (
                <div key={each._id} className="flex items-center mb-2">
                  <img
                    src={each.image.secure_url}
                    alt={each.name}
                    className="w-10 h-10 object-cover rounded mr-2"
                  />
                  <div>
                    <p>{each.name}</p>
                    <p>
                      {each.quantity} x ${each.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="col-span-1 md:col-span-1">${item.amount}</p>
            <p className="col-span-2 md:col-span-1 flex justify-end items-center">
              <select onChange={(e) => statusHandler(e,item._id)} value={item.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
