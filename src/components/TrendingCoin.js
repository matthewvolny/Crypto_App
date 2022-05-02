import React, { useEffect, useState } from "react";
import "./trendingCoin.css";

export default function TrendingCoin({ coin }) {
  const [color, setColor] = useState();

  // const {
  //   percentChange24hr,
  //   market_cap_rank,
  //   large,
  //   symbol,
  //   name,
  //   currentPrice,
  // } = props?.coin;

  const FormatPercentChange = () => {
    if (coin?.percentChange24hr > 0) {
      return `+${coin?.percentChange24hr}`;
    } else {
      return `${coin?.percentChange24hr}`;
    }
  };

  //set percentChange24hr to green or red
  useEffect(() => {
    if (coin?.percentChange24hr > 0) {
      setColor("green");
    } else {
      setColor("red");
    }
  }, [coin?.percentChange24hr]);

  return (
    <div className="trending-coin-container">
      <div className="trending-coin-image-and-rank-container">
        <img src={coin?.large} alt="coin-icon" />
        <div className="trending-coin-rank">#{coin?.market_cap_rank}</div>
      </div>

      <div className="trending-coin-symbol-and-name">
        <div className="trending-coin-symbol">{coin?.symbol}</div>
        <div className="trending-coin-name">{coin?.name}</div>
      </div>
      {/* <div className="trending-coin-price-and-percent-change"> */}
      <div className="trending-coin-price">${coin?.currentPrice}</div>
      <div className={`trending-coin-percent-change-24hr ${color}`}>
        {<FormatPercentChange />}
      </div>
      {/* </div> */}
    </div>
  );
}
