import React, { useState } from "react";
import "./portfolioChartControls.css";

export default function PortfolioChartControls(props) {
  const [actionClicked, setActionClicked] = useState();

  const dayButton = document.querySelector(".day");
  const weekButton = document.querySelector(".week");
  const monthButton = document.querySelector(".month");
  const yearButton = document.querySelector(".year");
  const allButton = document.querySelector(".all");

  const buttonDOMObject = {
    day: dayButton,
    week: weekButton,
    month: monthButton,
    year: yearButton,
    all: allButton,
  };

  //handles player actions, highlights and un-highlights action buttons
  const handleClick = (viewFieldValue, e) => {
    props.setViewFieldDuration(viewFieldValue);
    //
    if (!actionClicked) {
      buttonDOMObject["day"].removeAttribute("id");
      e.target.setAttribute("id", "clicked");
      setActionClicked(e.target.className);
    } else {
      //   console.log(buttonDOMObject[actionClicked]);
      buttonDOMObject[actionClicked].removeAttribute("id");
      e.target.setAttribute("id", "clicked");
      setActionClicked(e.target.className);
    }
  };

  return (
    <div className="portfolio-chart-controls">
      {/* <div
        className="percent"
        value="percent"
        // id="clicked"
        onClick={(e) => handleClick("1", e)}
      >
        percent
      </div> */}
      <div
        className="day"
        value="day"
        // id="clicked"
        onClick={(e) => handleClick("1", e)}
      >
        Day
      </div>
      <div className="week" value="week" onClick={(e) => handleClick("7", e)}>
        Week
      </div>
      <div
        className="month"
        value="month"
        onClick={(e) => handleClick("30", e)}
      >
        Month
      </div>
      <div className="year" value="year" onClick={(e) => handleClick("365", e)}>
        Year
      </div>
      <div className="all" value="all" onClick={(e) => handleClick("max", e)}>
        All
      </div>
    </div>
  );
}
