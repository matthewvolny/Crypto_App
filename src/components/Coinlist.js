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
    } else if (direction === "backward") {
      console.log("in backward");
      scrollArrayCopy = [];
      let lastIndex = lastIndexOfScrollArray; //11
      // let lastIndexOfPriorCoinArray = lastIndex - 6; //5
      let lastIndexOfPriorCoinArray = lastIndex - 12;
      // for (5; 5 >=0 ;i--)
      console.log("data for for loop");
      console.log(lastIndex);
      for (let i = 0; i < 6; i++) {
        console.log("in for loop");
        scrollArrayCopy.push(coinData[lastIndexOfPriorCoinArray + 1]);
        lastIndexOfPriorCoinArray = lastIndexOfPriorCoinArray + 1;
      }
      console.log("data after for loop"); //should be 7 - 12
      console.log(scrollArrayCopy);
      console.log(lastIndex);
      setLastIndexOfScrollArray(lastIndexOfPriorCoinArray);
      console.log(lastIndexOfScrollArray); //should be 11
      setClickScrollArray(scrollArrayCopy);
    }
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
        <CoinListNavigation
          scrollCoinList={scrollCoinList}
          lastIndexOfScrollArray={lastIndexOfScrollArray}
          coinData={coinData}
        />
      </div>
    </div>
  );
}
