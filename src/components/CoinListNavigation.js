import React, { useEffect } from "react";
import "./coinlistNavigation.css";

export default function CoinListNavigation({
  scrollCoinList,
  lastIndexOfScrollArray,
}) {
  useEffect(() => {
    const backButton = document.querySelector(".coin-navigation-backwards");
    if (lastIndexOfScrollArray < 11) {
      backButton.style.pointerEvents = "none";
    } else {
      backButton.style.pointerEvents = "auto";
    }
  }, [lastIndexOfScrollArray]);

  return (
    <div className="coinlist-naviation-container">
      <div>Showing 1 - 15 of 3600</div>

      <div>
        <img alt="left arrow" />
        <div
          className="coin-navigation-backwards"
          onClick={() => scrollCoinList("backward")}
        >
          Backward
        </div>
      </div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>...</div>
      <div>last page</div>
      <div>
        <img alt="right arrow" />
        <div onClick={() => scrollCoinList("forward")}>Forward</div>
      </div>
    </div>
  );
}
