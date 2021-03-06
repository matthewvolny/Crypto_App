import React, { useState, useContext, useEffect } from "react";
import Context from "../context/context";
import "./portfolioHeader.css";
import SearchBar from "./SearchBar";

export default function PortfolioHeader({ accountData, coinData }) {
  //   const { userInfo, heldCoins, accountBalanceChartData } = props?.accountData;
  const [greenOrRed, setGreenOrRed] = useState("black");

  const FindLidoStakedEtherPercentChange24hr = () => {
    const lidoStakedEther = coinData?.find((coin) => {
      return coin.id === "staked-ether";
    });
    if (lidoStakedEther > 0) {
      setGreenOrRed("green");
      return `+${lidoStakedEther.percentChange24hr}`;
    } else {
      setGreenOrRed("red");
      return `${lidoStakedEther.percentChange24hr}`;
    }
  };

  // useEffect(() => {
  //   console.log("in account header");
  //   console.log(accountData);
  // }, [accountData]);

  // useEffect(() => {
  //   if (parseFloat(lidoStakedEther.percentChange24hr) > 0) {
  //     setGreenOrRed24hr("green");
  //   } else {
  //     setGreenOrRed24hr("red");
  //   }
  // }, [percentChange24hr]);

  return (
    <div className="heading-and-searchbar-flex">
      <div className="portfolio-header">
        <div className="portfolio-header-name">
          {accountData?.userInfo.name}
        </div>
        <div className="portfolio-account-value-container">
          <div className="portfolio-header-price">
            $
            {Number(
              accountData?.accountBalanceChartData.hourData[
                accountData?.accountBalanceChartData.hourData.length - 1
              ].value
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div id={greenOrRed} className="portfolio-header-percent">
            {<FindLidoStakedEtherPercentChange24hr />}%
          </div>
        </div>
        <div className="portfolio-header-id">
          <span className="account-number-stars">*** ***&nbsp;</span>
          {accountData?.userInfo.accountNumber}
        </div>
      </div>
    </div>
  );
}
