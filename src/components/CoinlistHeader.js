import React from "react";
import "./coinlistHeader.css";

export default function CoinlistHeader({ coinData, setCoinData }) {
  //sort coin list using buttons
  const sortCoinList = (key) => {
    // console.log(coinData);
    const coinDataCopy = [...coinData];
    if (key === "name") {
      if (coinData[0][key] <= coinData[1][key]) {
        console.log("sort by name-desc");
        const sortedCoinsByNameDesc = coinDataCopy.sort((a, b) => {
          let name1 = a[key].toLowerCase();
          let name2 = b[key].toLowerCase();
          if (name1 > name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }
          return 0;
        });
        // console.log(sortedCoinsByNameDesc);
        setCoinData(sortedCoinsByNameDesc);
      } else {
        console.log("sort by name-asc");
        const sortedCoinsByNameAsc = coinDataCopy.sort((a, b) => {
          let name1 = a[key].toLowerCase();
          let name2 = b[key].toLowerCase();
          if (name1 < name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }
          return 0;
        });
        // console.log(sortedCoinsByNameAsc);
        setCoinData(sortedCoinsByNameAsc);
      }
    } else {
      if (parseFloat(coinData[0][key]) <= parseFloat(coinData[1][key])) {
        const sortedCoinsDesc = coinDataCopy.sort((a, b) => {
          return b[key] - a[key];
        });
        // console.log(`sorted by ${key} - descending`);
        // console.log(sortedCoinsDesc);
        setCoinData(sortedCoinsDesc);
      } else {
        const sortedCoinsAsc = coinDataCopy.sort((a, b) => {
          return a[key] - b[key];
        });
        // console.log(`sorted by ${key} - ascending`);
        // console.log(sortedCoinsAsc);
        setCoinData(sortedCoinsAsc);
      }
    }
  };

  return (
    <div className="coinlist-header">
      <div className="coinlist-header-secondary-container">
        <div className="coinlist-header-inner-container">
          <div
            className="coinlist-header-rank"
            onClick={() => sortCoinList("rank")}
          >
            Rank
          </div>
          <div className="coinlist-header-spacer"></div>
          <div
            className="coinlist-header-name"
            onClick={() => sortCoinList("name")}
          >
            <div>Name</div>
          </div>
          <div
            className="coinlist-header-price"
            onClick={() => sortCoinList("price")}
          >
            Price
          </div>
          <div
            className="coinlist-header-percent"
            onClick={() => sortCoinList("percentChange24hr")}
          >
            24hr%
          </div>
          <div
            className="coinlist-header-percent"
            onClick={() => sortCoinList("percentChange7d")}
          >
            7d%
          </div>
          <div
            className="coinlist-header-sparkline"
            onClick={() => sortCoinList("percentChange7d")}
          >
            Last 7 Days
          </div>
        </div>
      </div>
    </div>
  );
}
