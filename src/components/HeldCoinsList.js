import React, { useContext } from "react";
import Context from "../context/context";
import HeldCoinRow from "./HeldCoinRow";

export default function HeldCoinsList() {
  const { accountData, setAccountData } = useContext(Context);

  return (
    <div className="held-coins-list-container">
      {accountData.heldCoins.map((coin) => {
        return <HeldCoinRow coin={coin} />;
      })}
    </div>
  );
}
