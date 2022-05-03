import React, { useContext, useState, useEffect, useRef } from "react";
import ChartControls from "./ChartControls";
import Context from "../context/context";
import { createChart } from "lightweight-charts";
import axios from "axios";
import moment from "moment";
import "./chart.css";
moment().format();

export default function Chart() {
  const { selectedCoinData /*pageWidth*/ } = useContext(Context);
  const [coinChartData, setCoinChartData] = useState();
  //!set viewfield duration back to 1
  const [viewFieldDuration, setViewFieldDuration] = useState("1");
  const [timeFrameToFetch, setTimeFrameToFetch] = useState("90");
  const [chartMinSecVisibility, setChartMinSecVisibility] = useState();
  const [updatedWidth, setUpdatedWidth] = useState(355);
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  //const isMountedTwo = useRef(false);
  const prevTimeFrameToFetchRef = useRef("90");
  //const prevViewFieldDurationRef = useRef();

  //global variables
  const { id } = selectedCoinData;

  const coinId = selectedCoinData.id;

  // let globalChart;
  // let globalLineSeries;
  // let globalVolumeSeries;

  //(2)retrieves price/volume data for for varying periods of time
  const retrieveChartData = (duration) => {
    console.log("coinId");
    console.log(coinId);
    const coinLowercase = coinId.charAt(0).toLowerCase() + coinId.slice(1);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinLowercase}/market_chart?vs_currency=usd&days=${duration}`
      )
      .then((response) => {
        const data = response.data;
        console.log("fetched data");
        console.log(data);
        //formats "price" data based on whether it is in "days" or "hrs"
        const priceData = data?.prices;
        const priceDataArray = [];
        if (duration === "max") {
          //if viewfield set to "max"
          console.log(`data in "week" format`);
          for (let i = priceData?.length - 1; i >= 0; i--) {
            if (i % 7 === 0) {
              priceDataArray.unshift({
                time: moment(priceData[i][0]).format("MM/DD/YYYY"),
                value: priceData[i][1].toFixed(4),
              });
            }
          }
        } else if (duration === "1095") {
          //if viewfield set to "365"
          console.log(`data in "day" format`);
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
        //formats "volume" data based on whether it is in "days" or "hrs"
        const volumeData = data.total_volumes;
        const volumeDataArray = [];
        if (duration === "max") {
          //if viewfield set to "max"
          console.log(`data in "week" format`);
          for (let i = volumeData?.length - 1; i >= 0; i--) {
            if (i % 7 === 0) {
              volumeDataArray.unshift({
                time: moment(volumeData[i][0]).format("MM/DD/YYYY"),
                value: volumeData[i][1].toFixed(4),
              });
            }
          }
        } else if (duration === "1095") {
          //if viewfield set to "365"
          console.log(`data in "day" format`);
          volumeData.forEach((volumeArray) => {
            volumeDataArray.push({
              time: moment(volumeArray[0]).format("MM/DD/YYYY"),
              value: volumeArray[1].toFixed(4),
            });
          });
        } else {
          // console.log(`volume in "hr" format`);
          volumeData.forEach((volumeArray) => {
            const unixDate = Math.floor(volumeArray[0] / 1000);
            const unixDateTZAdjusted = unixDate - 14400;
            volumeDataArray.push({
              time: unixDateTZAdjusted,
              value: volumeArray[1].toFixed(4),
            });
          });
        }
        setCoinChartData({ prices: priceDataArray, volume: volumeDataArray });
      });
  };

  //!one time use to get mock data for account
  // useEffect(() => {
  //   console.log("coindatato JSON");
  //   console.log(coinChartData);
  //   const JSONdata = JSON.stringify(coinChartData);
  //   console.log(JSONdata);
  // }, [coinChartData]);

  //(1)calls function making API request for chart data, when  component rendered, coin selected, or "timeframe" for particular coin is changed (with button click)

  //const isMounted = useRef(false);

  //  if (isMounted.current) {
  //     if (document.querySelector(".tv-lightweight-charts")) {
  //       updateChartData(coinChartData);
  //     } else {
  //       renderChart(coinChartData);
  //     }
  //   } else {
  //     isMounted.current = true;
  //   }

  useEffect(() => {
    console.log("number 1");
    console.log(coinId);
    console.log(id);
    prevTimeFrameToFetchRef.current = timeFrameToFetch;
    //!can limit redundant calls here(i.e. repeated 30day calls)
    retrieveChartData(timeFrameToFetch);
  }, [selectedCoinData]);

  //(4a)renders the chart
  const renderChart = (coinChartData) => {
    console.log(coinChartData);
    const chart = createChart(document.querySelector(".chart"), {
      width: updatedWidth,
      height: 210,
      priceScale: {
        //adjusts space between line and top and bottom of chart
        scaleMargins: {
          top: 0.16,
          bottom: 0.16,
        },
        //!shows percent change
        // mode: 2,
        // borderVisible: true,
        borderColor: "black", //changed to grey
        entireTextOnly: true,
        // drawTicks: true,
      },
      rightPriceScale: {
        visible: true,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      crosshair: {
        vertLine: {
          visible: true,
          color: "gray",
          crosshairMarkerVisible: false,
          labelVisible: true,
          labelBackgroundColor: "gray",
        },
        horzLine: {
          visible: true,
          color: "gray",
          crosshairMarkerVisible: false,
          labelVisible: true,
          labelBackgroundColor: "gray",
        },
      },
      layout: {
        backgroundColor: "white",
        fontFamily: "Arial",
        fontSize: 15,
        textColor: "black",
      },

      timeScale: {
        //sets crosshair legend day vs min/sec visible
        timeVisible: chartMinSecVisibility,
        secondsVisible: chartMinSecVisibility,
        // borderVisible: true,
        borderColor: "black", //changed to grey
        //!offset of graph from right y-axis (vary this depending on scale of graph)
        //!may need to increase a wider graph
        //rightOffset: 1,  //!does not seem to work
        //barSpacing: 100, //space between histogram bars, will spread out data
        // minBarSpacing: 10, //space between histogram bars, will spread out data
        //!fixing the left edge(probably a good idea), fixing the right, maybe not(?)
        fixLeftEdge: true,
        // fixRightEdge: false,
        //some that could be useful, but not sure exactly what they do
        //lockVisibleTimeRangeOnResize: true,
        //rightBarStaysOnScroll: true,
        //shiftVisibleRangeOnNewBar: true, //used for adding realtime data
      },
    });

    const lineSeries = chart.addLineSeries();
    lineSeries.applyOptions({
      color: "#5E80FF",
      lineWidth: 4,
      //!may or may not keep these two on
      lastValueVisible: true,
      priceLineVisible: true,
      visible: true,
    });
    // console.log(coinChartData.prices);
    lineSeries.setData(coinChartData?.prices);

    //!way to update chart, though I do believe it also rerenders all the other data (not sure)
    // if (dataToAdd) {
    //   lineSeries.update(dataToAdd);
    // }

    const volumeSeries = chart.addHistogramSeries({
      color: "#D7E0FF",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      //!changes height of volume bars (keep "bottom" at 0)
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
      overlay: true,
    });
    // console.log(coinChartData.volume);
    volumeSeries.setData(coinChartData.volume);

    // //!show values back to a given date
    const todaysDate = new Date();
    const todaysDateUnixTime = new Date(todaysDate).getTime() / 1000;
    // const todaysFormattedUnixDate = Math.floor(todaysDate / 1000);
    switch (viewFieldDuration) {
      case "1":
        console.log("case 1");
        const twentyFourHoursPriorDate = todaysDateUnixTime - 86400;
        //!alternatively can show beginning of actual day (though this is more relevant for stocks, not crypto)
        // todaysDate.setUTCHours(0, 0, 0, 0);
        // const beginningOfDay = todaysDate.toUTCString();
        // const beginningOfDayUnixTime =
        //   new Date(beginningOfDay).getTime() / 1000;
        chart.timeScale().setVisibleRange({
          from: twentyFourHoursPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "7":
        console.log("case 7");
        const sevenDaysPriorDate = todaysDateUnixTime - 604800;
        chart.timeScale().setVisibleRange({
          from: sevenDaysPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "30":
        console.log("case 30");
        const oneMonthPriorDate = todaysDateUnixTime - 2592000;
        chart.timeScale().setVisibleRange({
          from: oneMonthPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "365":
        console.log("case 365");
        // debugger;
        const oneYearPriorDate = todaysDateUnixTime - 3.154e7;
        chart.timeScale().setVisibleRange({
          from: oneYearPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "1095":
        console.log("case 1095");
        const threeYearsPriorDate = todaysDateUnixTime - 9.467e7;
        chart.timeScale().setVisibleRange({
          from: threeYearsPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "max":
        console.log("case max");
        chart.timeScale().fitContent();
        break;
      default:
      // code block
    }
    //global variables used to update the chart (not currently being used)
    // globalChart = chart;
    // globalLineSeries = lineSeries;
    // globalVolumeSeries = volumeSeries;
  };

  //(4b)change chart data(two methods)
  const updateChartData = (newData) => {
    console.log("updateChart");
    console.log(newData);
    //!two approaches to replacing data in chart
    //!(1)-delete chart
    const previousChart = document.querySelector(".tv-lightweight-charts");
    previousChart?.remove();
    renderChart(newData);

    // //!(2)-delete series (presumably faster(?), not sure)
    // globalChart.removeSeries(globalLineSeries);
    // const newLineSeries = globalChart.addLineSeries();
    // newLineSeries.applyOptions({
    //   color: "red",
    //   lineWidth: 4,
    //   crosshairMarkerVisible: true,
    //   //!may or may not keep these two on
    //   lastValueVisible: true,
    //   priceLineVisible: true,
    // });
    // newLineSeries.setData(newData);

    // //!very usefull, keeps all data in frame
    // // globalChart.timeScale().fitContent();

    // //!scrolls screen 5 days to the left (with or without animation) - may have limited utility, as moves right side as well
    // //globalChart.timeScale().scrollToPosition(-5, true);
    // //!show values back to a given date
    // globalChart.timeScale().setVisibleRange({
    //   //!can programmatically get various times in the past(1yr ago,  max, etc.) from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    //   from: "2018-12-17",
    //   //!most recent date (may be able to set this a little in the future to get more space)
    //   to: new Date().toISOString().slice(0, 10),
    //   //or this // to: Date.now() / 1000;
    // });
  };

  //(3)renders a new chart or updates the current chart with new data (* this is (1) if chart is already rendered, as it updates chart on button click)
  useEffect(() => {
    if (isMounted.current) {
      if (document.querySelector(".tv-lightweight-charts")) {
        //!if user has clicked a different timeframe to fetch (i.e. from 90 days to max)
        if (prevTimeFrameToFetchRef.current !== timeFrameToFetch) {
          console.log("retrieve chart data - new timeframe");
          retrieveChartData(timeFrameToFetch);
          prevTimeFrameToFetchRef.current = timeFrameToFetch;
        } else {
          console.log("updateChartData - same timeframe");
          //! issue is here, when you click 365 before all it is the same timeframe and cannot add weekly data to state
          //deletes the chart before rendering
          updateChartData(coinChartData);
        }
      } else {
        renderChart(coinChartData);
      }
    } else {
      isMounted.current = true;
    }
  }, [coinChartData, viewFieldDuration]);

  useEffect(() => {
    if (viewFieldDuration === "365" || viewFieldDuration === "max") {
      setChartMinSecVisibility(false);
    } else {
      setChartMinSecVisibility(true);
    }
  }, [viewFieldDuration]);

  //
  // useEffect(() => {
  //   if (isMounted.current) {
  //     if (pageWidth < 1165) {
  //       setUpdatedWidth(355);
  //     } else if (pageWidth >= 1165 && pageWidth < 1235) {
  //       setUpdatedWidth(400);
  //     } else if (pageWidth >= 1235 && pageWidth < 1315) {
  //       setUpdatedWidth(450);
  //     } else if (pageWidth >= 1315) {
  //       setUpdatedWidth(500);
  //     }
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [pageWidth]);

  // useEffect(() => {
  //   if (isMountedTwo.current) {
  //     updateChartData(coinChartData);
  //   } else {
  //     isMountedTwo.current = true;
  //   }
  // }, [updatedWidth, coinChartData]);

  return (
    <div className="chart-container">
      <div className="chart-flex">
        <div className="chart-with-controls-container">
          <ChartControls
            setViewFieldDuration={setViewFieldDuration}
            setTimeFrameToFetch={setTimeFrameToFetch}
          />
          <div className="chart"></div>
        </div>
      </div>
    </div>
  );
}
