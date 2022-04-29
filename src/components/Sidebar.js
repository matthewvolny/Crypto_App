import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cryptoCharacter from "../images/crypto-logo.png";
import axios from "axios";
import Context from "../context/context";
import "./sidebar.css";

export default function Sidebar({ firstCoinData }) {
  const {
    selectedCoinData,
    setSelectedCoinData,
    setCoinChartData,
    setCurrentRoute,
    coinData,
    setCoinData,
    // setTrendingCoins,
    accountData,
    setAccountData,
  } = useContext(Context);
  const [selectedCoinDataWithDescription, setSelectedCoinDataWithDescription] =
    useState();
  // const [trendingCoinsLocal, setTrendingCoinsLocal] = useState([]);
  const [actionClicked, setActionClicked] = useState();

  const homeButton = document.querySelector(".sidebar-home");
  const marketButton = document.querySelector(".sidebar-market");
  const chartButton = document.querySelector(".sidebar-chart");

  const buttonDOMObject = {
    "sidebar-home": homeButton,
    "sidebar-market": marketButton,
    "sidebar-chart": chartButton,
  };

  //handles player actions, highlights and un-highlights action buttons
  const handleClick = (e) => {
    if (!actionClicked) {
      e.target.parentElement.setAttribute("id", "sidebar-clicked");
      e.target.setAttribute("id", "sidebar-navlink-clicked");
      setActionClicked(e.target.parentElement.className);
    } else {
      //   console.log(buttonDOMObject[actionClicked]);
      buttonDOMObject[actionClicked].removeAttribute("id");
      buttonDOMObject[actionClicked].firstChild.removeAttribute("id");
      e.target.parentElement.setAttribute("id", "sidebar-clicked");
      e.target.setAttribute("id", "sidebar-navlink-clicked");
      setActionClicked(e.target.parentElement.className);
    }
  };

  //console.log(firstCoinData?.name);

  //adds "description" to coin selectedCoinInfo
  const fetchCoinDescription = (coin) => {
    console.log("in fetchCoinDescription");
    console.log(coin);
    console.log(coin.id);
    let selectedCoinInfo = coin;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.id}`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        // console.log(data.description.en);
        selectedCoinInfo.description = data.description.en;
        // console.log("selectedCoinInfo");
        // console.log(selectedCoinInfo);
        setSelectedCoinDataWithDescription(selectedCoinInfo);
      });
  };

  // //fetch trending coin data
  // const fetchTrendingCoins = () => {
  //   axios
  //     .get("https://api.coingecko.com/api/v3/search/trending")
  //     .then((response) => {
  //       const data = response.data;
  //       // console.log("trending coins data");
  //       // console.log(data);
  //       // console.log(data.coins);
  //       const coins = data.coins;
  //       const trendingCoinArray = [];
  //       coins.forEach((coin) => {
  //         trendingCoinArray.push(coin.item);
  //       });
  //       // console.log(trendingCoinArray);
  //       setTrendingCoinsLocal(trendingCoinArray);
  //     });
  // };

  // //add additional data to fetched trending coins, store trending coins in state
  // useEffect(() => {
  //   let trendingCoinsLocalCopy = [...trendingCoinsLocal];
  //   for (let i = 0; i < trendingCoinsLocalCopy.length; i++) {
  //     for (let j = 0; j < coinData?.length; j++) {
  //       if (trendingCoinsLocalCopy[i].id == coinData[j].id) {
  //         trendingCoinsLocalCopy[i].percentChange24hr =
  //           coinData[j].percentChange24hr;
  //         trendingCoinsLocalCopy[i].currentPrice = coinData[j].price;
  //         trendingCoinsLocalCopy[i].percentChange7d =
  //           coinData[j].percentChange7d;
  //         trendingCoinsLocalCopy[i].sparkline = coinData[j].sparkline;
  //       }
  //     }
  //   }
  //   // console.log("trending coins copy");
  //   console.log(trendingCoinsLocalCopy);
  //   setTrendingCoins(trendingCoinsLocalCopy);
  // }, [trendingCoinsLocal]);

  //simulating the purchase of 3 different coins three months ago using 50% of account funds
  const buyMockCoinsThreeMonthsAgo = () => {
    const weekFormatAccountData = accountData.accountBalanceChartData.weekData;
    const halfOfAccountFinalBalance =
      weekFormatAccountData[weekFormatAccountData.length - 1].value / 2;
    const percent23AccountBalance = (halfOfAccountFinalBalance / 100) * 22;
    const percent31AccountBalance = (halfOfAccountFinalBalance / 100) * 37;
    const percent46AccountBalance = (halfOfAccountFinalBalance / 100) * 45;
    let heldCoinsCopy = [...accountData.heldCoins];
    for (let i = 0; i < heldCoinsCopy.length; i++) {
      if (heldCoinsCopy[i].coin_id === "ethereum") {
        const coinNumberEthereum =
          percent46AccountBalance / accountData.heldCoins[i].price3MonthsAgo;
        heldCoinsCopy[i].coinNumber = coinNumberEthereum;
        heldCoinsCopy[i].marketValue =
          accountData.heldCoins[i].currentPrice * coinNumberEthereum;
      } else if (heldCoinsCopy[i].coin_id === "bitcoin") {
        const coinNumberBitcoin =
          percent31AccountBalance / accountData.heldCoins[i].price3MonthsAgo;
        heldCoinsCopy[i].coinNumber = coinNumberBitcoin;
        heldCoinsCopy[i].marketValue =
          accountData.heldCoins[i].currentPrice * coinNumberBitcoin;
      } else if (heldCoinsCopy[i].coin_id === "dogecoin") {
        const coinNumberDogeCoin =
          percent23AccountBalance / accountData.heldCoins[i].price3MonthsAgo;
        heldCoinsCopy[i].coinNumber = coinNumberDogeCoin;
        heldCoinsCopy[i].marketValue =
          accountData.heldCoins[i].currentPrice * coinNumberDogeCoin;
      }
    }
    setAccountData({ ...accountData, heldCoins: heldCoinsCopy });
  };

  return (
    <>
      <div className="logo-container">
        <img src={cryptoCharacter} alt="logo" />
      </div>
      <div id="sidebar-line"></div>
      <div className="sidebar-home">
        <NavLink
          className="sidebar-navlink"
          to={`/portfolio`}
          onMouseEnter={() => {
            //function to buy mock coins 3 months ago
            buyMockCoinsThreeMonthsAgo();
          }}
          onClick={(e) => {
            handleClick(e);
            setCurrentRoute("portfolio");
            setSelectedCoinData();
          }}
        >
          Home
        </NavLink>
      </div>
      <div className="sidebar-market">
        <NavLink
          className="sidebar-navlink"
          to={`/`}
          onMouseEnter={() => {
            // fetchTrendingCoins();
          }}
          onClick={(e) => {
            handleClick(e);
            setCurrentRoute("market");
            //setTrending(selectedCoinDataWithDescription);
          }}
        >
          Market
        </NavLink>
      </div>
      <div className="sidebar-chart">
        <NavLink
          className="sidebar-navlink"
          to={`/currencies/${firstCoinData?.name}`}
          onMouseEnter={() => {
            fetchCoinDescription(firstCoinData);
          }}
          onClick={(e) => {
            handleClick(e);
            setCurrentRoute("chart");
            setSelectedCoinData(selectedCoinDataWithDescription);
          }}
        >
          Chart
        </NavLink>
      </div>

      <div>Trade</div>
      <div>Settings</div>
      <div id="logout">Log Out</div>
    </>
  );
}
