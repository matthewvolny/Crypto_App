import React, { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "./heldCoinRow.css";
import { accountBalanceChartData, heldCoins } from "../mockData/data";
import axios from "axios";

export default function HeldCoinRow({ coin }) {
  const { accountData, coinData } = useContext(Context);
  const [heldCoinInfo, setHeldCoinInfo] = useState();
  const [sparklineColor, setSparklineColor] = useState();

  //calculation of todays return
  const TodaysReturn = () => {
    console.log("coin.currentprice");
    console.log(coin.currentPrice);
    console.log("coin.price24HoursAgo");
    console.log(coin.price24HoursAgo);
    if (coin.currentPrice < coin.price24HoursAgo) {
      return `-$${(
        (coin.price24HoursAgo - coin.currentPrice) *
        coin.coinNumber
      ).toFixed(2)}`;
    } else {
      return `+$${(
        (coin.currentPrice - coin.price24HoursAgo) *
        coin.coinNumber
      ).toFixed(2)}`;
    }
  };

  const TodaysPercentReturn = () => {
    if (coin.currentPrice < coin.price24HoursAgo) {
      const difference = coin.price24HoursAgo - coin.currentPrice;
      return `-${((difference / coin.price24HoursAgo) * 100).toFixed(2)}%`;
    } else {
      const difference = coin.currentPrice - coin.price24HoursAgo;
      return `+${((difference / coin.price24HoursAgo) * 100).toFixed(2)}%`;
    }
  };

  //calculation of total return
  const TotalReturn = () => {
    console.log("coin.currentprice");
    console.log(coin.currentPrice);
    console.log("coin.price24HoursAgo");
    console.log(coin.price3MonthsAgo);
    if (coin.currentPrice < coin.price3MonthsAgo) {
      return `-$${(
        (coin.price3MonthsAgo - coin.currentPrice) *
        coin.coinNumber
      ).toFixed(2)}`;
    } else {
      return `+$${(
        (coin.currentPrice - coin.price3MonthsAgo) *
        coin.coinNumber
      ).toFixed(2)}`;
    }
  };

  const TotalPercentReturn = () => {
    if (coin.currentPrice < coin.price3MonthsAgo) {
      const difference = coin.price3MonthsAgo - coin.currentPrice;
      return `-${((difference / coin.price3MonthsAgo) * 100).toFixed(2)}%`;
    } else {
      const difference = coin.currentPrice - coin.price3MonthsAgo;
      return `+${((difference / coin.price3MonthsAgo) * 100).toFixed(2)}%`;
    }
  };

  return (
    <div className="held-coins-row">
      <div className="held-coins-row-image-container">
        <img src={coin.image} alt="coin-icon" />
      </div>
      <div className="coin-name-and-quantity">
        <div className="held-coin-name">{coin.name}</div>
        <div className="held-coin-quantity">
          {coin.coinNumber.toFixed(2)} coins
        </div>
      </div>
      {/* <div className="coins-held-sparkline-container">
        <Sparklines data={coin?.sparkline}>
          <SparklinesLine
            style={{ strokeWidth: 3, stroke: sparklineColor, fill: "none" }}
          />
        </Sparklines>
      </div> */}
      <div className="held-coin-market-value">
        ${Number(coin.marketValue.toFixed(2)).toLocaleString("en-US")}
      </div>
      <div className="return-and-percentage">
        <div className="todays-return">{<TodaysReturn />}</div>
        <div className="todays-return-percent">{<TodaysPercentReturn />}</div>
      </div>
      <div className="return-and-percentage">
        <div className="total-return">{<TotalReturn />}</div>
        <div className="todays-return-percent">{<TotalPercentReturn />}</div>
      </div>
    </div>
  );
}
