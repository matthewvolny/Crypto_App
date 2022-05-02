import React, { Profiler, useEffect, useState, useContext } from "react";
import BarChart from "./BarChart";
// import Context from "../context/context";
import "./barChart.css";

export default function ExchangesList({ exchangesInfo }) {
  // const [exchangesArray, setExchangesArray] = useState();
  // const { exchangesInfo } = useContext(Context);

  //sorts exchangesArray
  // useEffect(() => {
  //   const newArray = [];
  //   exchangesInfo?.forEach((exchange) => {
  //     newArray.push(exchange);
  //   });
  //   newArray.sort((a, b) => {
  //     return a.trustScoreRank - b.trustScoreRank;
  //   });
  //   setExchangesArray(newArray);
  // }, [exchangesInfo]);

  return (
    <>
      <div className="exchanges-list-header">Trading Volume</div>
      <div className="exchanges-list">
        {exchangesInfo?.length !== 0 &&
          exchangesInfo?.map((exchange) => {
            return <BarChart exchange={exchange} />;
          })}
      </div>
    </>
  );
}
