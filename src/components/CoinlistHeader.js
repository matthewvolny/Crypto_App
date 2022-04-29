import React from "react";
import "./coinlistHeader.css";

export default function CoinlistHeader() {
  const sortCoinList = () => {
    console.log("not hooked up yet");
  };

  return (
    <div className="coinlist-header">
      <div onClick={() => sortCoinList("rank")}>Rank</div>
      <div onClick={() => sortCoinList("name")}>Name</div>
      <div onClick={() => sortCoinList("price")}>Price</div>
      <div onClick={() => sortCoinList("percentChange24hr")}>24hr%</div>
      <div onClick={() => sortCoinList("percentChange7d")}>7d%</div>
      <div onClick={() => sortCoinList("percentChange7d")}>Last 7 Days</div>
    </div>
  );
}
