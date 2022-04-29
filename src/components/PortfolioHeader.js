import React, { useState, useContext, useEffect } from "react";
import Context from "../context/context";
import "./portfolioHeader.css";
import SearchBar from "./SearchBar";

export default function PortfolioHeader({ accountData, coinData }) {
  //   const { userInfo, heldCoins, accountBalanceChartData } = props?.accountData;

  const FindLidoStakedEtherPercentChange24hr = () => {
    const lidoStakedEther = coinData?.find((coin) => {
      return coin.id === "staked-ether";
    });
    if (lidoStakedEther > 0) {
      return `+${lidoStakedEther.percentChange24hr}`;
    } else {
      return `-${lidoStakedEther.percentChange24hr}`;
    }
  };

  return (
    <div className="heading-and-searchbar-flex">
      <div className="portfolio-header">
        <div className="portfolio-header-name">
          {accountData?.userInfo.name}
        </div>
        <div className="portfolio-account-value-container">
          <div className="portfolio-header-price">
            $
            {(accountData?.accountBalanceChartData.hourData[
              accountData?.accountBalanceChartData.hourData.length - 1
            ].value).toLocaleString("en-US")}
          </div>
          <div className="portfolio-header-percent">
            {<FindLidoStakedEtherPercentChange24hr />}%
          </div>
        </div>
        <div className="portfolio-header-id">*** *** 1473</div>
      </div>
      <SearchBar />
    </div>
  );
}
