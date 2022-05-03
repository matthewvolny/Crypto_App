import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cryptoCharacter from "../images/crypto-mondo-globe-modified.png";
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
    highlightChart,
    setHighlightChart,
    loggedIn,
    setBarChartRerenderAtHomeHover,
  } = useContext(Context);

  const [selectedCoinDataWithDescription, setSelectedCoinDataWithDescription] =
    useState();
  // const [trendingCoinsLocal, setTrendingCoinsLocal] = useState([]);
  const [actionClicked, setActionClicked] = useState();

  const homeButton = document.querySelector(".sidebar-home");
  const marketButton = document.querySelector(".sidebar-market");
  const chartButton = document.querySelector(".sidebar-chart");
  const coinsButton = document.querySelector(".sidebar-currencies");

  const buttonDOMObject = {
    "sidebar-home": homeButton,
    "sidebar-market": marketButton,
    "sidebar-chart": chartButton,
    "sidebar-currencies": coinsButton,
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

  //change highlighting when navigating to the chart element via the coinRows component
  useEffect(() => {
    if (highlightChart) {
      buttonDOMObject[actionClicked].removeAttribute("id");
      buttonDOMObject[actionClicked].firstChild.removeAttribute("id");
      // chartButton.parentElement.setAttribute("id", "sidebar-clicked");
      chartButton.setAttribute("id", "sidebar-clicked");
      chartButton.firstChild.setAttribute("id", "sidebar-navlink-clicked");
      setActionClicked(chartButton.className);
      setHighlightChart(false);
    }
  }, [highlightChart]);

  //adds "description" to coin selectedCoinInfo
  const fetchCoinDescription = (coin) => {
    // console.log("in fetchCoinDescription");
    // console.log(coin);
    // console.log(coin.id);
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

  //simulating the purchase of 3 different coins three months ago using 50% of account funds
  const buyMockCoinsThreeMonthsAgo = () => {
    const weekFormatAccountData =
      accountData?.accountBalanceChartData?.weekData;
    const halfOfAccountFinalBalance =
      weekFormatAccountData[weekFormatAccountData?.length - 1].value / 2;
    const percent23AccountBalance = (halfOfAccountFinalBalance / 100) * 22;
    const percent31AccountBalance = (halfOfAccountFinalBalance / 100) * 37;
    const percent46AccountBalance = (halfOfAccountFinalBalance / 100) * 45;
    let heldCoinsCopy = [...accountData?.heldCoins];
    for (let i = 0; i < heldCoinsCopy?.length; i++) {
      if (heldCoinsCopy[i].coin_id === "ethereum") {
        const coinNumberEthereum =
          percent46AccountBalance / accountData?.heldCoins[i]?.price3MonthsAgo;
        heldCoinsCopy[i].coinNumber = coinNumberEthereum;
        heldCoinsCopy[i].marketValue =
          accountData?.heldCoins[i]?.currentPrice * coinNumberEthereum;
      } else if (heldCoinsCopy[i]?.coin_id === "bitcoin") {
        const coinNumberBitcoin =
          percent31AccountBalance / accountData?.heldCoins[i]?.price3MonthsAgo;
        heldCoinsCopy[i].coinNumber = coinNumberBitcoin;
        heldCoinsCopy[i].marketValue =
          accountData?.heldCoins[i]?.currentPrice * coinNumberBitcoin;
      } else if (heldCoinsCopy[i]?.coin_id === "dogecoin") {
        const coinNumberDogeCoin =
          percent23AccountBalance / accountData?.heldCoins[i]?.price3MonthsAgo;
        heldCoinsCopy[i].coinNumber = coinNumberDogeCoin;
        heldCoinsCopy[i].marketValue =
          accountData?.heldCoins[i]?.currentPrice * coinNumberDogeCoin;
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
      {loggedIn && (
        <div className="sidebar-home">
          <NavLink
            className="sidebar-navlink"
            to={`/portfolio`}
            onMouseEnter={() => {
              //function to buy mock coins 3 months ago
              setBarChartRerenderAtHomeHover(false);
              buyMockCoinsThreeMonthsAgo();
            }}
            onClick={(e) => {
              handleClick(e);
              setCurrentRoute("portfolio");
              setSelectedCoinData();
              //!
              setBarChartRerenderAtHomeHover(true);
            }}
          >
            Home
          </NavLink>
        </div>
      )}
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
      <div className="sidebar-currencies">
        <NavLink
          className="sidebar-navlink"
          to={`/currencies`}
          onMouseEnter={() => {
            // fetchTrendingCoins();
          }}
          onClick={(e) => {
            handleClick(e);
            setCurrentRoute("currencies");
            //setTrending(selectedCoinDataWithDescription);
          }}
        >
          Coins
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

      <div className="trade-button">Trade</div>
      <div className="settings-button">Settings</div>
      {/* <div id="logout">Log Out</div> */}
    </>
  );
}
