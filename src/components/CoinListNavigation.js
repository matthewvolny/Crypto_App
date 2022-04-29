import React from "react";
import "./coinlistNavigation.css";

export default function CoinListNavigation() {
  return (
    <div className="coinlist-naviation-container">
      <div>Showing 1 - 15 of 3600</div>

      <div>
        <img alt="left arrow" />
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
      </div>
    </div>
  );
}
