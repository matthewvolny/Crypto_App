import React, { useEffect, useRef, useContext, useState } from "react";
//import Context from "../context/context";
import { createChart } from "lightweight-charts";
import CoinRow from "./CoinRow";
import CoinListNavigation from "./CoinListNavigation";

import "./coinlist.css";

export default function Coinlist({ coinData }) {
  const [clickScrollArray, setClickScrollArray] = useState();
  const [lastIndexOfScrollArray, setLastIndexOfScrollArray] = useState();

  const scrollCoinList = (direction) => {
    let scrollArrayCopy = [...clickScrollArray];
    if (direction === "forward") {
      scrollArrayCopy = []; //array with next 6 coins
      let lastIndex = lastIndexOfScrollArray;
      for (let i = 0; i < 6; i++) {
        scrollArrayCopy.push(coinData[lastIndex + 1]);
        lastIndex = lastIndex + 1;
      }
      console.log("scrollArrayCopy"); //should be 7 - 12
      console.log(scrollArrayCopy);
      setLastIndexOfScrollArray(lastIndex);
      console.log(lastIndexOfScrollArray); //should be 11
      setClickScrollArray(scrollArrayCopy);
    } else if (direction === "backward" && lastIndexOfScrollArray !== 5) {
      // scrollArrayCopy = []; //array with next 6 coins
      // let lastIndex = lastIndexOfScrollArray;
      // for (let i = 0; i < 6; i++) {
      //   scrollArrayCopy.push(coinData[lastIndex + 1]);
      //   lastIndex = lastIndex + 1;
      // }
      // console.log("scrollArrayCopy"); //should be 7 - 12
      // console.log(scrollArrayCopy);
      // setLastIndexOfScrollArray(lastIndex);
      // console.log(lastIndexOfScrollArray); //should be 11
      // setClickScrollArray(scrollArrayCopy);
    }

    // console.log("shifted scroll array");
    // console.log(scrollArrayCopy);
    // if (lastIndexOfScrollArray >= 6) {
    //   console.log(trendingCoins[0]);
    //   scrollArrayCopy.push(trendingCoins[0]);
    //   setLastIndexOfScrollArray(0);
    // } else {
    //   scrollArrayCopy.push(trendingCoins[lastIndexOfScrollArray + 1]);
    //   console.log(scrollArray);
    //   setLastIndexOfScrollArray(lastIndexOfScrollArray + 1);
    // }
    // setScrollArray(scrollArrayCopy);
  };

  useEffect(() => {
    let visibleCoinsArray = [];
    coinData?.forEach((coin, index) => {
      if (index < 6) {
        visibleCoinsArray.push(coin);
      }
    });
    setLastIndexOfScrollArray(5);
    setClickScrollArray(visibleCoinsArray);
  }, [coinData]);

  return (
    <div className="coinlist-secondary-container">
      <div className="coinlist">
        {clickScrollArray?.map((coin, index) => {
          // if (index < 6) {
          return (
            <CoinRow key={Math.floor(Math.random() * 10000)} coin={coin} />
          );
          // }
        })}
        <CoinListNavigation scrollCoinList={scrollCoinList} />
      </div>
    </div>
  );
}
