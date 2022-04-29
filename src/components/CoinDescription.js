import React, { useContext } from "react";
import Context from "../context/context";
import "./coinDescription.css";

export default function CoinDescription() {
  const { selectedCoinData } = useContext(Context);

  return (
    <div className="coin-description-container">
      {/* <div className="section">
        <div className="coin-description-heading">Name</div>
        <div>{selectedCoinData?.name}</div>
      </div> */}
      <div className="section">
        <div className="coin-description-heading">Rank</div>
        <div>#{selectedCoinData?.rank}</div>
      </div>
      <div className="section">
        <div className="coin-description-heading">Market Capitalization</div>
        <div>{selectedCoinData?.marketCap}</div>
      </div>
      <div className="section">
        <div className="coin-description-heading">Volume(24hr)</div>
        <div>{selectedCoinData?.volume24hr}</div>
      </div>
      <div className="section">
        <div className="coin-description-heading">Description</div>
        <div>{selectedCoinData?.description}</div>
      </div>
    </div>
  );
}
