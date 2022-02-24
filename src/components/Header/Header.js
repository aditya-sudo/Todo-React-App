import React from "react";
import "./Header.css";
const header = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();

  return (
    <header>
      <div className="DateDayBox">
        <div className="DateBox">
          <p className="Date">{d.getDate()}</p>
          <p className="Month">{monthNames[d.getMonth()]}</p>
          <p className="Year">{d.getFullYear()}</p>
        </div>
        <div className="DayBox">
          <p className="Day">{dayNames[d.getDay()]}</p>
        </div>
      </div>
    </header>
  );
};

export default header;
