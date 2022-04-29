import React, { useEffect, useContext, useState } from "react";
import Context from "../context/context";
import TrendingCoin from "./TrendingCoin";
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

  //!large, small, thumb
  //const [indexesinView, setIndexesInView] = useState({ index1: 0, index2: 3 });
  const [indexesinView, setIndexesInView] = useState({
    index1: 0,
    index2: 3,
  });

  const scrollTrendingCoins = () => {
    // if (indexesinView.index2 > 7) {
    //   setIndexesInView({
    //     index1: 0,
    //     index2: 3,
    //   });
    // } else {
    setIndexesInView({
      index1: indexesinView.index1 + 1,
      index2: indexesinView.index2 + 1,
    });
    // }
  };

  return (
    <div className="trending-coins-list-and-navigation">
      <div onClick={scrollTrendingCoins}>See more</div>
      <div className="trending-coins-list-container">
        {trendingCoins?.map((coin, index) => {
          if (index >= indexesinView.index1 && index < indexesinView.index2) {
            return <TrendingCoin coin={coin} />;
          }
        })}
      </div>
    </div>
  );
}
