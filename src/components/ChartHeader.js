import React, { useState, useContext, useEffect } from "react";
import Context from "../context/context";
import "./chartHeader.css";
import SearchBar from "./SearchBar";

export default function ChartHeader() {
  const { selectedCoinData } = useContext(Context);
  const [greenOrRed, setGreenOrRed] = useState("black");

  const {
    id,
    rank,
    image,
    name,
    symbol,
    price,
    percentChange24hr,
    percentChange7d,
    marketCap,
    volume24hr,
    description,
  } = selectedCoinData;

  return (
    <div className="heading-and-searchbar-flex">
      <div className="coin-header">
        {/* <div className="coin-header-rank">
          <div>Rank&nbsp;</div>
          <div>#{rank}</div>
        </div> */}
        <div className="coin-header-image-container">
          <img className="header-icon" src={image} alt="icon" />
        </div>
        <div className="coin-header-name-symbol-container">
          {/* <div className="coin-details-name-container"> */}
          <div className="coin-header-name">{name}</div>
          <div className="coin-header-symbol">
            <span className="parentheses-chart-header">(</span>
            {symbol.toUpperCase()}
            <span className="parentheses-chart-header">)</span>
          </div>
        </div>
        <div className="coin-header-price-container">
          <div className="coin-header-price">
            ${Number(price).toLocaleString("en-US")}
          </div>
          <div className="coin-header-percent" id={greenOrRed}>
            {percentChange24hr}%
          </div>
        </div>
      </div>
    </div>
  );
}
