import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function AdminDashboard() {
  const [menu, setMenu] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [newItem, setNewItem] = useState({
    type: "Breakfast",
    name: "",
    quantity: "",
    serves: "",
    price: ""
  });

  useEffect(() => {
    fetch("https://cloud-kitchen-raix.onrender.com/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleInputChange = (e) => setNewItem({ ...newItem, [e.target.name]: e.target.value });

  const addMenuItem = () => {
    if (!selectedDate) return alert("Please select a date!");

    fetch("https://cloud-kitchen-raix.onrender.com/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        type: newItem.type,
        item: newItem
      })
    })
      .then((res) => res.json())
      .then((data) => setMenu(data.menu));

    setNewItem({ type: "Breakfast", name: "", quantity: "", serves: "", price: "" });
  };

  const deleteMenuItem = (date, type, index) => {
    fetch("https://cloud-kitchen-raix.onrender.com/api/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, type, index })
    })
      .then((res) => res.json())
      .then((data) => setMenu(data.menu));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel - Manage Menu</h2>

      <div className="menu-form">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />

        <label>Meal Type:</label>
        <select name="type" value={newItem.type} onChange={handleInputChange}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <label>Item Name:</label>
        <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />

        <label>Quantity:</label>
        <input type="text" name="quantity" value={newItem.quantity} onChange={handleInputChange} />

        <label>Serves:</label>
        <input type="text" name="serves" value={newItem.serves} onChange={handleInputChange} />

        <label>Price:</label>
        <input type="text" name="price" value={newItem.price} onChange={handleInputChange} />

        <button onClick={addMenuItem}>Add Item</button>
      </div>

      <h3>Existing Menus</h3>
      <div className="menu-list">
        {Object.keys(menu).length === 0 ? (
          <p>No menu available.</p>
        ) : (
          Object.keys(menu).map((date) => (
            <div key={date} className="menu-date">
              <h4>{date}</h4>
              {Object.keys(menu[date]).map((type) => (
                <div key={type} className="menu-category">
                  <h5>{type}</h5>
                  <ul>
                    {menu[date][type].map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} - {item.serves} - {item.price}
                        <button onClick={() => deleteMenuItem(date, type, index)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
