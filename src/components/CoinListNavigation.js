import React, { useEffect } from "react";
import "./coinlistNavigation.css";

export default function CoinListNavigation({
  scrollCoinList,
  lastIndexOfScrollArray,
  coinData,
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
    <div className="coinlist-navigation-container">
      <div className="coinlist-showing-number">
        Showing {lastIndexOfScrollArray - 4} - {lastIndexOfScrollArray + 1}{" "}
        of&nbsp;
        {coinData.length}
      </div>
      <div className="coin-list-navigation-bar">
        <div>
          {/* <img alt="left arrow" /> */}
          <div
            className="coin-navigation-backwards"
            onClick={() => scrollCoinList("backward")}
          >
            Backward
          </div>
        </div>

        <div className="coinlist-navigation-current-page">
          {Math.ceil(lastIndexOfScrollArray / 6)}
        </div>
        <div>{Math.ceil(lastIndexOfScrollArray / 6) + 1}</div>
        <div>{Math.ceil(lastIndexOfScrollArray / 6) + 2}</div>
        <div>...</div>
        <div>{Math.ceil(coinData.length / 6)}</div>
        <div>
          {/* <img alt="right arrow" /> */}
          <div onClick={() => scrollCoinList("forward")}>Forward</div>
        </div>
      </div>
    </div>
  );
}
