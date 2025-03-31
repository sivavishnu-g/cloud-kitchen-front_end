import React, { useState, useEffect } from "react";
import "../styles/menu.css";

function Menu() {
  const [menu, setMenu] = useState({});
  const [today, setToday] = useState("");

  useEffect(() => {
    // Fetch menu data from the backend
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error fetching menu:", err));

    // Get today's date (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];
    setToday(currentDate);
  }, []);

  const getUpcomingDates = () => {
    const upcomingDates = [];
    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + i);
      upcomingDates.push(nextDate.toISOString().split("T")[0]);
    }
    return upcomingDates;
  };

  // Function to get meal icon based on type
  const getMealIcon = (mealType) => {
    const icons = {
      Breakfast: "🍽️",
      Lunch: "🍛",
      Dinner: "🍲",
    };
    return icons[mealType] || "🥗"; // Default icon if not found
  };

  return (
    <section className="menu">
      <h2>Today's Menu</h2>
      {menu[today] ? (
        Object.keys(menu[today]).map((mealType) => (
          <div key={mealType} className="meal-section">
            <h3>
              <span className="meal-icon">{getMealIcon(mealType)}</span> {mealType}
            </h3>
            <ul>
              {menu[today][mealType].length === 0 ? (
                <p>No items available</p>
              ) : (
                menu[today][mealType].map((item, index) => (
                  <li key={index} className="items">
                    <strong className="name">{item.name}</strong> <span className="item"> Quantity - {item.quantity} Total Serves - {item.serves} Price - {item.price} </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No menu available for today.</p>
      )}

      <h2>Upcoming Menus</h2>
      {getUpcomingDates().map((date) => (
        <div key={date} className="meal-section">
          <h3>{date}</h3>
          {menu[date] ? (
            Object.keys(menu[date]).map((mealType) => (
              <div key={mealType}>
                <h4>
                  <span className="meal-icon">{getMealIcon(mealType)}</span> {mealType}
                </h4>
                <ul>
                {menu[today][mealType].length === 0 ? (
                <p>No items available</p>
              ) : (
                menu[today][mealType].map((item, index) => (
                  <li key={index} className="items">
                    <strong className="name">{item.name}</strong> <span className="item"> Quantity - {item.quantity} Total Serves - {item.serves} Price - {item.price} </span>
                  </li>
                ))
              )}
                </ul>
              </div>
            ))
          ) : (
            <p>No menu available for this day.</p>
          )}
        </div>
      ))}
    </section>
  );
}

export default Menu;
