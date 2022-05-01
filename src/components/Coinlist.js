import React, { useEffect, useRef, useContext, useState } from "react";
//import Context from "../context/context";
import { createChart } from "lightweight-charts";
import CoinRow from "./CoinRow";
import CoinListNavigation from "./CoinListNavigation";

import "./coinlist.css";

export default function Coinlist({ coinData }) {
  // const { coinData } = useContext(Context);
  const [searchInput, setSearchInput] = useState();

  //sort by name
  const sortByName = (key) => {};

  // //sort coin list using buttons
  // const sortCoinList = (key) => {
  //   // console.log(coinData);
  //   const coinDataCopy = [...coinData];
  //   if (key === "name") {
  //     if (coinData[0][key] <= coinData[1][key]) {
  //       console.log("sort by name-desc");
  //       const sortedCoinsByNameDesc = coinDataCopy.sort((a, b) => {
  //         let name1 = a[key].toLowerCase();
  //         let name2 = b[key].toLowerCase();
  //         if (name1 > name2) {
  //           return -1;
  //         }
  //         if (name1 > name2) {
  //           return 1;
  //         }
  //         return 0;
  //       });
  //       // console.log(sortedCoinsByNameDesc);
  //       setCoinData(sortedCoinsByNameDesc);
  //     } else {
  //       console.log("sort by name-asc");
  //       const sortedCoinsByNameAsc = coinDataCopy.sort((a, b) => {
  //         let name1 = a[key].toLowerCase();
  //         let name2 = b[key].toLowerCase();
  //         if (name1 < name2) {
  //           return -1;
  //         }
  //         if (name1 > name2) {
  //           return 1;
  //         }
  //         return 0;
  //       });
  //       // console.log(sortedCoinsByNameAsc);
  //       setCoinData(sortedCoinsByNameAsc);
  //     }
  //   } else {
  //     if (parseFloat(coinData[0][key]) <= parseFloat(coinData[1][key])) {
  //       const sortedCoinsDesc = coinDataCopy.sort((a, b) => {
  //         return b[key] - a[key];
  //       });
  //       // console.log(`sorted by ${key} - descending`);
  //       // console.log(sortedCoinsDesc);
  //       setCoinData(sortedCoinsDesc);
  //     } else {
  //       const sortedCoinsAsc = coinDataCopy.sort((a, b) => {
  //         return a[key] - b[key];
  //       });
  //       // console.log(`sorted by ${key} - ascending`);
  //       // console.log(sortedCoinsAsc);
  //       setCoinData(sortedCoinsAsc);
  //     }
  //   }
  // };

  return (
    <div className="coinlist-secondary-container">
      <div className="coinlist">
        {coinData?.map((coin, index) => {
          if (index < 6) {
            return <CoinRow coin={coin} />;
          }
        })}
        <CoinListNavigation />
      </div>
    </div>
  );
}
