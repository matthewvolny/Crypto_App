import React, { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "./heldCoinRow.css";
import { accountBalanceChartData, heldCoins } from "../mockData/data";
import axios from "axios";

export default function HeldCoinRow({ coin }) {
  const { accountData, coinData } = useContext(Context);
  const [heldCoinInfo, setHeldCoinInfo] = useState();
  const [sparklineColor, setSparklineColor] = useState();

  //   const heldCoinsSparkline = () => {
  //     const foundCoin = coinData?.find((coinfromCoinData) => {
  //       return coinfromCoinData.name === coin.name;
  //     });
  //     console.log(foundCoin);
  //     return foundCoin.sparkline;
  //   };

  //   const heldCoinsImage = () => {
  //     const foundCoin = coinData?.find((coinfromCoinData) => {
  //       return coinfromCoinData.name === coin.name;
  //     });
  //     console.log(foundCoin);
  //     // setHeldCoinInfo(foundCoin);
  //     return foundCoin.image;
  //   };
  //   //   HeldCoinsSparkline(coin);

  //!maybe retrieve this data earlier
  //   //(1)get info for all coins currently being held
  //   useEffect(() => {
  //     if (coinData) {
  //       const foundCoin = coinData?.find((coinFromCoinData) => {
  //         return coinFromCoinData.name === coin.name;
  //       });
  //       setHeldCoinInfo(foundCoin);
  //     }
  //   });

  //   //(3)fetch coin prices 24hr ago and 3 months ago
  //   const fetchPrices = (coinName, date) => {
  //     axios
  //       .get(
  //         `https://api.coingecko.com/api/v3/coins/${coinName}/history?date=${date}`
  //       )
  //       .then((response) => {
  //         const data = response.data;
  //         console.log(data);
  //         // const coinDataArray = [];
  //         // data.forEach((coin) => {
  //         //   coinDataArray.push({
  //         //     sparkline: roundSparklineData(coin.sparkline_in_7d),
  //         //   });
  //         // });
  //         // console.log("held coins fetch result");
  //         // console.log(coinDataArray);
  //         // setCoinData(coinDataArray);
  //       });
  //   };

  //   //(2)!need to get price 24hrs ago, and price on day coin was purchased.
  //   const calculateReturn = (duration) => {
  //     const currentPrice = heldCoinInfo?.price;
  //     console.log("currentPrice");
  //     console.log(coin.name);
  //     console.log(currentPrice);
  //     fetchPrices(coin.name, "23-03-2022");
  //     fetchPrices(coin.name, "23-12-2021");
  //   };
  //
  //24hr ago

  //given date
  //https://api.coingecko.com/api/v3/coins/bitcoin/history?date=25-03-2022

  //calculation of todays return
  const TodaysReturn = () => {
    console.log("coin.currentprice");
    console.log(coin.currentPrice);
    console.log("coin.price24HoursAgo");
    console.log(coin.price24HoursAgo);
    if (coin.currentPrice < coin.price24HoursAgo) {
      return `-${(
        (coin.price24HoursAgo - coin.currentPrice) *
        coin.coinNumber
      ).toFixed(2)}`;
    } else {
      return `+${(
        (coin.currentPrice - coin.price24HoursAgo) *
        coin.coinNumber
      ).toFixed(2)}`;
    }
  };

  const TodaysPercentReturn = () => {
    if (coin.currentPrice < coin.price24HoursAgo) {
      const difference = coin.price24HoursAgo - coin.currentPrice;
      return `-${((difference / coin.price24HoursAgo) * 100).toFixed(2)}`;
    } else {
      const difference = coin.currentPrice - coin.price24HoursAgo;
      return `+${((difference / coin.price24HoursAgo) * 100).toFixed(2)}`;
    }
  };

  //calculation of total return
  const TotalReturn = () => {
    console.log("coin.currentprice");
    console.log(coin.currentPrice);
    console.log("coin.price24HoursAgo");
    console.log(coin.price3MonthsAgo);
    if (coin.currentPrice < coin.price3MonthsAgo) {
      return `-${(
        (coin.price3MonthsAgo - coin.currentPrice) *
        coin.coinNumber
      ).toFixed(2)}`;
    } else {
      return `+${(
        (coin.currentPrice - coin.price3MonthsAgo) *
        coin.coinNumber
      ).toFixed(2)}`;
    }
  };

  const TotalPercentReturn = () => {
    if (coin.currentPrice < coin.price3MonthsAgo) {
      const difference = coin.price3MonthsAgo - coin.currentPrice;
      return `-${((difference / coin.price3MonthsAgo) * 100).toFixed(2)}`;
    } else {
      const difference = coin.currentPrice - coin.price3MonthsAgo;
      return `+${((difference / coin.price3MonthsAgo) * 100).toFixed(2)}`;
    }
  };

  return (
    <div className="held-coins-row">
      <div className="held-coins-row-image-container">
        <img src={coin.image} alt="coin-icon" />
      </div>
      <div className="coin-name-and-quantity">
        <div className="held-coin-name">{coin.name}</div>
        <div>{coin.coinNumber.toFixed(2)} coins</div>
      </div>
      <Sparklines data={coin?.sparkline}>
        <SparklinesLine
          style={{ strokeWidth: 3, stroke: sparklineColor, fill: "none" }}
        />
      </Sparklines>
      <div className="todays-return">Today's return {<TodaysReturn />}</div>
      <div className="todays-return-percent">
        Today's % return {<TodaysPercentReturn />}
      </div>

      <div className="total-return">Total return{<TotalReturn />}</div>
      <div className="todays-return-percent">
        Total % return {<TotalPercentReturn />}
      </div>
      <div>Market Value {coin.marketValue.toFixed(2)}</div>
    </div>
  );
}
