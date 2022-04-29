import React, { useContext } from "react";
import Context from "../context/context";
import HeldCoinRow from "./HeldCoinRow";

export default function HeldCoinsList() {
  const { accountData, setAccountData } = useContext(Context);

  return (
    <>
      <div className="held-coins-list-header">Holdings</div>
      <div className="held-coins-list-labels">
        <div className="held-coins-list-labels-inner-container">
          <div className="held-coins-navigation">
            <div className="blank-icon-spacer"></div>
            <div className="black-name-spacer"></div>
            <div className="held-coins-market-value-label">Market Value</div>
            <div className="held-coins-daily-return-label">Return (today)</div>
            <div className="held-coins-total-return-label">Return (total)</div>
          </div>
        </div>
      </div>
      <div className="held-coins-list-container">
        <div className="held-coins-list-inner-container">
          {accountData.heldCoins.map((coin) => {
            return <HeldCoinRow coin={coin} />;
          })}
        </div>
        {/* <div className="held-coins-legend">Price(7 Days)</div> */}
      </div>
    </>
  );
}
