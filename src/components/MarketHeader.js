import React from "react";
import "./marketHeader.css";
import SearchBar from "./SearchBar";

export default function MarketHeader() {
  return (
    <div className="market-heading-and-searchbar-flex">
      <div className="market-header">
        <div className="market-header-name">Market Activity</div>
        <div className="market-account-value-container">
          <div className="market-header-price">Trending coins</div>
        </div>
        {/* <div className="market-header-id">*** *** 1473</div> */}
      </div>
      <SearchBar />
    </div>
  );
}
