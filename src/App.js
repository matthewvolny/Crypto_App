import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./context/context";
import Sidebar from "./components/Sidebar";
import Portfolio from "./components/Portfolio";
import MarketHeader from "./components/MarketHeader";
import Market from "./components/Market";
import HeldCoinsList from "./components/HeldCoinsList";
import CoinlistHeader from "./components/CoinlistHeader";
import Coinlist from "./components/Coinlist";
import PortfolioHeader from "./components/PortfolioHeader";
import Chart from "./components/Chart";
import ChartHeader from "./components/ChartHeader";
import CoinDescription from "./components/CoinDescription";
import DonutChart from "./components/DonutChart";
import LoginAndSignUp from "./components/LoginAndSignUp";
import SearchBar from "./components/SearchBar";
import ExchangesList from "./components/ExchangesList";
import BarChart from "./components/BarChart";
import NewsFeed from "./components/NewsFeed";
import colorBlock from "./images/color-block-expanded.png";
import { heldCoins, accountBalanceChartData, userInfo } from "./mockData/data";
import BitcoinAndEthereumInfo from "./components/BitcoinAndEthereumInfo";
import axios from "axios";
import "./App.css";
import moment from "moment";
moment().format();

function App() {
  const [coinData, setCoinData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState();
  const [loggedIn, setLoggedIn] = useState(true);
  const [accountData, setAccountData] = useState();
  const [currentRoute, setCurrentRoute] = useState();
  const [trendingCoins, setTrendingCoins] = useState();
  const [exchangesInfo, setExchangesInfo] = useState();
  const [trendingCoinsLocal, setTrendingCoinsLocal] = useState([]);
  const [highlightChart, setHighlightChart] = useState(false);

  //(ddd)retrieves price data (mockAccountChartData) for all time (daily) and
  const fetchMockAccountBalanceChartData = async (duration) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/staked-ether/market_chart?vs_currency=usd&days=${duration}`
    );
    //formats "price" data based on whether it is in "days" or "hrs"
    const priceData = data.prices;
    const priceDataArray = [];
    if (duration === "max") {
      //if viewfield set to "max"
      // console.log(`data in "week" format`);
      for (let i = priceData.length - 1; i >= 0; i--) {
        if (i % 7 === 0) {
          priceDataArray.unshift({
            time: moment(priceData[i][0]).format("MM/DD/YYYY"),
            value: priceData[i][1].toFixed(4),
          });
        }
      }
    } else if (duration === "1095") {
      //if viewfield set to "365"
      // console.log(`data in "day" format`);
      priceData.forEach((priceArray) => {
        priceDataArray.push({
          time: moment(priceArray[0]).format("MM/DD/YYYY"),
          value: priceArray[1].toFixed(4),
        });
      });
    } else {
      // console.log(`price in "hr" format`);
      priceData.forEach((priceArray) => {
        const unixDate = Math.floor(priceArray[0] / 1000);
        const unixDateTZAdjusted = unixDate - 14400;
        priceDataArray.push({
          time: unixDateTZAdjusted,
          value: priceArray[1].toFixed(4),
        });
      });
    }

    return priceDataArray;
  };

  //(ccc)fetch coin prices 24hr ago and 3 months ago
  const fetchHeldCoinPastPrices = async (coinName, date, image) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinName}/history?date=${date}`
    );
    console.log("fetch held coin past prices");
    if (image) {
      return data.image.small;
    } else {
      //  console.log("fetch held coin past prices");
      // console.log(data.market_data.current_price.usd);
      return data.market_data.current_price.usd;
    }
  };

  //(bbb)gets additional info for all coins currently being held
  const addIdSparklineCurrentPricesToHeldCoins = async (heldCoins) => {
    const heldCoinsCopy = heldCoins;
    for (let i = 0; i < heldCoinsCopy.length; i++) {
      for (let j = 0; j < coinData?.length; j++) {
        if (heldCoinsCopy[i].name == coinData[j].name) {
          heldCoinsCopy[i].coin_id = coinData[j].id;
          heldCoinsCopy[i].currentPrice = coinData[j].price;
          heldCoinsCopy[i].sparkline = coinData[j].sparkline;
          heldCoinsCopy[i].image = coinData[j].image;
          //!currently hardcoded in, this should change
          heldCoinsCopy[i].price24HoursAgo = await fetchHeldCoinPastPrices(
            coinData[j].id,
            "27-03-2022"
          );
          heldCoinsCopy[i].price3MonthsAgo = await fetchHeldCoinPastPrices(
            coinData[j].id,
            "27-01-2022"
          );
        }
      }
    }
    return heldCoinsCopy;
  };

  // (aaa)!sets account data after logging in
  useEffect(() => {
    if (loggedIn) {
      const setAccountDataAsyncFunction = async () => {
        setAccountData({
          userInfo: userInfo,
          heldCoins: await addIdSparklineCurrentPricesToHeldCoins(heldCoins),
          accountBalanceChartData: {
            hourData: await fetchMockAccountBalanceChartData("90"),
            dayData: await fetchMockAccountBalanceChartData("1095"),
            weekData: await fetchMockAccountBalanceChartData("max"),
          },
        });
      };
      setAccountDataAsyncFunction();
    }
  }, [coinData]);

  //(3)shortens sparkline data array and rounds to four places
  //!check to make sure the "first" and "last" values are in the shortened array - need for accurate coloring
  const roundSparklineData = (data) => {
    let dataArray = data.price;
    //console.log(dataArray);
    for (let i = dataArray.length - 1; i >= 0; i--) {
      if (i % 8 !== 0) {
        dataArray.splice(i, 1);
      } else {
        // console.log(dataArray[i]);
        dataArray[i].toFixed(4); //!not rounding
      }
    }
    // console.log(dataArray);
    return dataArray;
  };

  //!price rounding function (should be improved, try to match coinmarketcap)
  const roundCoinPrice = (price) => {
    if (price < 0 && price > 0.0001) {
      return price?.toFixed(4);
    } else if (price < 0.0001 && price > 0.00001) {
      return price?.toFixed(5);
    } else if (price < 0.00001 && price > 0.000001) {
      return price?.toFixed(6);
    }
    return price?.toFixed(2);
  };

  //(2)initial api call retrieves list data for a subset of coins
  // const fetchInitialCoinSet = () => {
  //   axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d"
  //     )
  //     .then((response) => {
  //       const data = response.data;
  //       console.log("data right out of fetch request");
  //       console.log(data);
  //       const coinDataArray = [];
  //       data.forEach((coin) => {
  //         debugger;
  //         coinDataArray.push({
  //           id: coin.id,
  //           rank: coin.market_cap_rank,
  //           image: coin.image,
  //           name: coin.name,
  //           symbol: coin.symbol,
  //           price: roundCoinPrice(
  //             coin.current_price
  //           ), /*?.toLocaleString("en-US"), //!not added commas*/,
  //           percentChange24hr:
  //             coin.price_change_percentage_24h_in_currency.toFixed(2),
  //           percentChange7d:
  //             coin.price_change_percentage_7d_in_currency.toFixed(2),
  //           marketCap: coin.market_cap.toLocaleString("en-US"),
  //           volume24hr: coin.total_volume.toLocaleString("en-US"),
  //           sparkline: roundSparklineData(coin.sparkline_in_7d),
  //         });
  //       });
  //       console.log("initial CoinData fetch after push");
  //       console.log(coinDataArray);
  //       setCoinData(coinDataArray);
  //     });
  // };

  const fetchAllRankedCoins = async (initialPage, stopIndex) => {
    console.log("coinData state before copying in fetch");
    console.log(coinData);
    const coinDataArray = [...coinData];
    for (let i = initialPage; i <= stopIndex; i++) {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=true&price_change_percentage=24h%2C7d`
      );

      console.log("fetch of all coin data");
      console.log(data);
      data.forEach((coin) => {
        //!may want to add sorting on coin rank
        // if (coin.rank) {
        coinDataArray.push({
          id: coin.id,
          rank: coin.market_cap_rank,
          image: coin.image,
          name: coin.name,
          symbol: coin.symbol,
          price: roundCoinPrice(coin.current_price)?.toLocaleString("en-US"),
          percentChange24hr:
            coin.price_change_percentage_24h_in_currency?.toFixed(2),
          percentChange7d:
            coin.price_change_percentage_7d_in_currency?.toFixed(2),
          marketCap: coin.market_cap?.toLocaleString("en-US"),
          volume24hr: coin.total_volume?.toLocaleString("en-US"),
          sparkline: roundSparklineData(coin.sparkline_in_7d),
        });
        // }
      });
    }
    // console.log(coinDataArray);
    const sortedCoinDataArray = coinDataArray.sort((a, b) => {
      return a.rank - b.rank;
    });
    console.log("second coinData fetch (sorted coin data)");
    console.log(sortedCoinDataArray); //coin data sorted
    setCoinData(sortedCoinDataArray); //!not sorted in state (probably missing an update)
  };

  //fetch exchange volume for 1 and 7 days
  const fetchExchangeVolume = async (exchange, days) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges/${exchange}/volume_chart?days=${days}`
    );
    const formattedData = data.map(([name, value]) => ({ name, value }));

    if (days === "1") {
      let shortenedFormattedData = [];
      let totalVolumePerUnitTime = 0;
      let shortestLength = null;
      let smallestNumber = null;
      let totalVolume = 0;
      formattedData.forEach((day, index) => {
        //!take this opportunity to set total volume for 24hrs, and total volume7days to state (may not work, may need to do additional fetch requests for this)
        totalVolumePerUnitTime += day.value;
        //totalVolume += day.value;
        if (index !== 0 && index % 23 === 0) {
          const currentNumber = parseFloat(totalVolumePerUnitTime).toFixed(0);
          if (shortestLength === null) {
            shortestLength = currentNumber.length;
            smallestNumber = currentNumber;
          } else if (currentNumber < smallestNumber) {
            shortestLength = currentNumber.length;
            smallestNumber = currentNumber;
          }
          console.log("exhcange and shortest#");
          // console.log(exchange);
          // console.log(smallestNumber);
          const divisor = "1".padEnd(shortestLength, "0");
          const subtractor = Number(String(smallestNumber).charAt(0));

          //const subtractor = 0;
          // console.log("subtractor");
          // console.log(subtractor);
          shortenedFormattedData.push({
            value:
              (parseFloat(totalVolumePerUnitTime) / divisor - subtractor) * 7,
            name: moment(day.name).format("hh:mm a"),
          });
          totalVolumePerUnitTime = 0;
        }
      });
      return shortenedFormattedData;
    }
    //setExchangeTotalVolume({exchange:exchange, total1DayVolume:totalVolume})
    // else {
    //!should include this for 7 days.
    //}
  };

  const fetchExchangeTotalVolume = async (exchange, days) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges/${exchange}/volume_chart?days=${days}`
    );
    const formattedData = data.map(([name, value]) => ({ name, value }));
    if (days === "1") {
      let totalVolume = 0;
      formattedData.forEach((day, index) => {
        totalVolume += Number(day.value);
      });
      return totalVolume.toFixed(2);
    }
  };

  //fetch top 5 exchanges (general info) and store in state
  const fetchTopExchanges = () => {
    axios
      .get("https://api.coingecko.com/api/v3/exchanges?per_page=3&page=1")
      .then((response) => {
        const data = response.data;
        // console.log(data);
        const exchangeArray = [];
        data.forEach(async (exchange) => {
          exchangeArray.push({
            id: exchange.id,
            url: exchange.url,
            image: exchange.image,
            name: exchange.name,
            trustScoreRank: exchange.trust_score_rank,
            volume1Day: await fetchExchangeVolume(exchange.id, "1"),
            totalVolume1Day: await fetchExchangeTotalVolume(exchange.id, "1"),
            //volume1Week: await fetchExchangeVolume(exchange.id, "7"),
            //totalVolume1Week: await fetchExchangeVolume(exchange.id, "7"),
          });
        });
        setExchangesInfo(exchangeArray);
      });
  };

  //fetch trending coin data
  const fetchTrendingCoins = () => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        const data = response.data;
        // console.log("trending coins data");
        // console.log(data);
        // console.log(data.coins);
        const coins = data.coins;
        const trendingCoinArray = [];
        coins.forEach((coin) => {
          trendingCoinArray.push(coin.item);
        });
        // console.log(trendingCoinArray);
        setTrendingCoinsLocal(trendingCoinArray);
      });
  };

  //add additional data to fetched trending coins, store trending coins in state
  useEffect(() => {
    let trendingCoinsLocalCopy = [...trendingCoinsLocal];
    for (let i = 0; i < trendingCoinsLocalCopy.length; i++) {
      for (let j = 0; j < coinData?.length; j++) {
        if (trendingCoinsLocalCopy[i].id == coinData[j].id) {
          trendingCoinsLocalCopy[i].percentChange24hr =
            coinData[j].percentChange24hr;
          trendingCoinsLocalCopy[i].currentPrice = coinData[j].price;
          trendingCoinsLocalCopy[i].percentChange7d =
            coinData[j].percentChange7d;
          trendingCoinsLocalCopy[i].sparkline = coinData[j].sparkline;
        }
      }
    }
    // console.log("trending coins copy");
    // console.log(trendingCoinsLocalCopy);
    setTrendingCoins(trendingCoinsLocalCopy);
  }, [trendingCoinsLocal, coinData]);

  //(1) fetch initial set of coins, then a larger set of all ranked coins
  useEffect(() => {
    console.log("should only run once");
    //console.log(coinData)
    //fetchInitialCoinSet();
    fetchTopExchanges();
    fetchTrendingCoins();
    fetchAllRankedCoins(1, 1);
    //fetchAllRankedCoins(1, 5);
  }, []);

  return (
    <Context.Provider
      value={{
        accountData,
        setAccountData,
        coinData,
        // setCoinData,
        selectedCoinData,
        setSelectedCoinData,
        currentRoute,
        setCurrentRoute,
        trendingCoins,
        setTrendingCoins,
        highlightChart,
        setHighlightChart,
        loggedIn,
        setLoggedIn,
      }}
    >
      <div className="container">
        <BrowserRouter>
          <img className="color-block" src={colorBlock} alt="color-block" />
          <div className="sidebar-flex">
            <Sidebar /*userInfo={userInfo}*/ firstCoinData={coinData[0]} />
          </div>
          <div className="main-content-flex">
            <div className="middle-flex">
              {currentRoute === "chart" ? (
                <ChartHeader />
              ) : currentRoute === "portfolio" ? (
                <PortfolioHeader
                  accountData={accountData}
                  coinData={coinData}
                />
              ) : (
                <MarketHeader />
              )}
              <Routes>
                <Route path="/" element={<Market />} />
                <Route
                  path="/portfolio"
                  element={<Portfolio accountData={accountData} />}
                />
                <Route path="/currencies/:id" element={<Chart />} />
                <Route
                  path="/currencies"
                  element={
                    <CoinlistHeader
                      coinData={coinData}
                      setCoinData={setCoinData}
                    />
                  }
                />
              </Routes>
              {
                currentRoute === "portfolio" ? (
                  <HeldCoinsList />
                ) : currentRoute === "currencies" ? (
                  <>
                    <div className="coinlist-container">
                      <Coinlist coinData={coinData} />
                    </div>
                  </>
                ) : currentRoute === "chart" ? (
                  <NewsFeed />
                ) : (
                  <ExchangesList exchangesInfo={exchangesInfo} />
                )

                // <NewsFeed />
                // <>
                //   <CoinlistHeader />
                //   <div className="coinlist-container">
                //     <Coinlist coinData={coinData} setCoinData={setCoinData} />
                //   </div>
                // </>
              }
            </div>
            <div className="right-flex">
              <div className="login-and-searchbar-flex">
                <LoginAndSignUp />
                <SearchBar />
              </div>
              {currentRoute === "portfolio" ? (
                <DonutChart />
              ) : currentRoute === "chart" ? (
                <CoinDescription />
              ) : currentRoute === "currencies" ? (
                <></>
              ) : (
                <BitcoinAndEthereumInfo coinData={coinData} />
              )}
              {/* <NewsFeed /> */}
            </div>
          </div>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
