import React, { useEffect, useContext, useState } from "react";
import Context from "../context/context";
import TrendingCoin from "./TrendingCoin";
import doubleArrow from "../images/double_arrow.png";
import "./trendingCoin.css";
// import axios from "axios";

//!key market info endpoint, lists exchanges and 24hr volume for btc
//https://api.coingecko.com/api/v3/exchanges

//!global crypto market stats (could have bar chart with market cap percentages)
//https://api.coingecko.com/api/v3/global

//market infor for a particular coin (has vol traded in various markets, images for markets, depth)
//api.coingecko.com/api/v3/coins/bitcoin/tickers

export default function Market() {
  const { trendingCoins } = useContext(Context);
  const [scrollArray, setScrollArray] = useState([]);
  const [lastIndexOfScrollArray, setLastIndexOfScrollArray] = useState();

  //!large, small, thumb

  const scrollTrendingCoins = () => {
    let scrollArrayCopy = [...scrollArray];
    scrollArrayCopy.shift();
    console.log("shifted scroll array");
    console.log(scrollArrayCopy);
    if (lastIndexOfScrollArray >= 6) {
      console.log(trendingCoins[0]);
      scrollArrayCopy.push(trendingCoins[0]);
      setLastIndexOfScrollArray(0);
    } else {
      scrollArrayCopy.push(trendingCoins[lastIndexOfScrollArray + 1]);
      console.log(scrollArray);
      setLastIndexOfScrollArray(lastIndexOfScrollArray + 1);
    }
    setScrollArray(scrollArrayCopy);
  };

  useEffect(() => {
    const newArray = [];
    trendingCoins?.forEach((coin, index) => {
      if (index < 3) {
        newArray.push(coin);
      }
    });
    setLastIndexOfScrollArray(2);
    setScrollArray(newArray);
  }, [trendingCoins]);

  return (
    <div className="trending-coins-list-and-navigation">
      <div className=" trending-coins-scroll-flex">
        <div className="trending-coins-header">Trending Coins</div>
        <div className="trending-coins-navigation">
          <div onClick={scrollTrendingCoins}>See more</div>
          <img src={doubleArrow} alt="double arrow" />
        </div>
      </div>
      <div className="trending-coins-list-container">
        {scrollArray?.length !== 0 &&
          scrollArray?.map((coin, index) => {
            // if (index >= indexesinView.index1 && index < indexesinView.index2) {
            return (
              <TrendingCoin
                key={Math.floor(Math.random() * 10000)}
                coin={coin}
              />
            );
            // }
          })}
      </div>
    </div>
  );
}
