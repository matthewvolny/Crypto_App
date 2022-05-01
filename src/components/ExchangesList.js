import React, { Profiler, useEffect, useState } from "react";
import BarChart from "./BarChart";
import "./barChart.css";

export default function ExchangesList({ exchangesInfo }) {
  const [exchangesArray, setExchangesArray] = useState();

  //sorts exchangesArray
  useEffect(() => {
    const newArray = [];
    exchangesInfo?.forEach((exchange) => {
      newArray.push(exchange);
    });
    const sortedArray = newArray.sort((a, b) => {
      return a.trustScoreRank - b.trustScoreRank;
    });
    setExchangesArray(sortedArray);
  }, [exchangesInfo]);

  return (
    <>
      <div className="exchanges-list-header">Trading Volume</div>
      <div className="exchanges-list">
        {exchangesArray?.map((exchange) => {
          return <BarChart exchange={exchange} />;
        })}
      </div>
    </>
  );
}
