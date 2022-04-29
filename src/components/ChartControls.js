import React, { useContext, useState, useEffect, useRef } from "react";
// import Context from "../context/context";
import "./chartControls.css";

export default function ChartControls(props) {
  const [actionClicked, setActionClicked] = useState();
  //const { actionClicked, setActionClicked } = useContext(Context);

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
  const handleClick = (viewFieldValue, timeFrameValue, e) => {
    props.setViewFieldDuration(viewFieldValue);
    props.setTimeFrameToFetch(timeFrameValue);
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

  //!may or may not want to removeAttribute on selecting a new coin
  //unclicks player action buttons when changing rooms
  // useEffect(() => {
  // if (actionClicked) {
  //   actionDOMObject[actionClicked].removeAttribute("id");
  // }
  // }, [props.roomEvaluateDetails]);

  return (
    <div className="chart-controls">
      <div
        className="day"
        value="day"
        id="clicked"
        onClick={(e) => handleClick("1", "90", e)}
      >
        D
      </div>
      <div
        className="week"
        value="week"
        onClick={(e) => handleClick("7", "90", e)}
      >
        W
      </div>
      <div
        className="month"
        value="month"
        onClick={(e) => handleClick("30", "90", e)}
      >
        M
      </div>
      <div
        className="year"
        value="year"
        onClick={(e) => handleClick("365", "1095", e)}
      >
        Y
      </div>
      <div
        className="all"
        value="all"
        onClick={(e) => handleClick("max", "max", e)}
      >
        A
      </div>
    </div>
  );
}
