import React, { Profiler, useEffect } from "react";
import BarChart from "./BarChart";
import "./barChart.css";

export default function ExchangesList({ exchangesInfo }) {
  return (
    <>
      <div className="exchanges-list-header">Trading Volume</div>
      <div className="exchanges-list">
        {exchangesInfo?.map((exchange) => {
          return <BarChart exchange={exchange} />;
        })}
      </div>
    </>
  );
}
