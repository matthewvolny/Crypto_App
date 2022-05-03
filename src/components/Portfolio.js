import React, { useState, useContext, useEffect, useRef } from "react";
import Context from "../context/context";
import PortfolioChartControls from "./PortfolioChartControls";
import DonutChart from "./DonutChart";
import LineChartComp from "./LineChartComp";
// import ChartControls from "./ChartControls";
import { createChart } from "lightweight-charts";
import "./portfolio.css";

export default function Portfolio(props) {
  const { pageWidth } = useContext(Context);
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const [updatedWidth, setUpdatedWidth] = useState(355);
  const [viewFieldDuration, setViewFieldDuration] = useState("1");
  const [chartMinSecVisibility, setChartMinSecVisibility] = useState(true);
  const [chartToggle, setChartToggle] = useState(false);
  const { accountBalanceChartData, heldCoins } = props?.accountData;
  const [lastDataUsedToMakeChart, setLastDataUsedToMakeChart] = useState();

  //(4a)renders the chart
  const renderChart = (accountBalanceData) => {
    // console.log(accountBalanceData);
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
        //mode: 2,
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
    lineSeries.setData(accountBalanceData);

    //!way to update chart, though I do believe it also rerenders all the other data (not sure)
    // if (dataToAdd) {
    //   lineSeries.update(dataToAdd);
    // }

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
  };

  const updateChartData = (newData) => {
    console.log("updateChart");
    console.log(newData);
    //!two approaches to replacing data in chart
    //!(1)-delete chart
    const previousChart = document.querySelector(".tv-lightweight-charts");
    previousChart.remove();
    renderChart(newData);
  };

  useEffect(() => {
    // if (isMounted.current) {
    if (document.querySelector(".tv-lightweight-charts")) {
      if (viewFieldDuration === "365" || viewFieldDuration === "max") {
        updateChartData(accountBalanceChartData.dayData);
        setLastDataUsedToMakeChart(accountBalanceChartData.dayData);
      } else {
        updateChartData(accountBalanceChartData.hourData);
        setLastDataUsedToMakeChart(accountBalanceChartData.hourData);
      }
    } else {
      if (viewFieldDuration === "365" || viewFieldDuration === "max") {
        const chartScreen = document.querySelector(".screen");
        chartScreen.setAttribute("id", "reveal-chart");
        renderChart(accountBalanceChartData.dayData);
        setLastDataUsedToMakeChart(accountBalanceChartData.dayData);
      } else {
        const chartScreen = document.querySelector(".screen");
        chartScreen.setAttribute("id", "reveal-chart");
        renderChart(accountBalanceChartData.hourData);
        setLastDataUsedToMakeChart(accountBalanceChartData.hourData);
      }
    }
    // } else {
    //   isMounted.current = true;
    // }
  }, [viewFieldDuration]);

  //conditionally render account balance chart with day or hourly data
  // useEffect(() => {
  //   // if (isMounted.current) {
  //   console.log("account balance chart data");
  //   console.log(accountBalanceChartData.dayData);
  //   const chartScreen = document.querySelector(".screen");
  //   chartScreen.setAttribute("id", "reveal-chart");
  //   if (viewFieldDuration === "365" || viewFieldDuration === "max") {
  //     renderChart(accountBalanceChartData.dayData);
  //   } else {
  //     renderChart(accountBalanceChartData.hourData);
  //   }
  //   // } else {
  //   //   isMounted.current = true;
  //   // }
  //   // console.log("component mounted");
  // }, [viewFieldDuration]);

  //
  useEffect(() => {
    if (isMounted.current) {
      // if (pageWidth < 1165) {
      setUpdatedWidth(355);
    } else if (pageWidth >= 1165 && pageWidth < 1235) {
      setUpdatedWidth(400);
    } else if (pageWidth >= 1235 && pageWidth < 1315) {
      setUpdatedWidth(450);
    } else if (pageWidth >= 1315 && pageWidth < 1400) {
      setUpdatedWidth(500);
    }
    // } else {
    //   isMounted.current = true;
    // }
  }, [pageWidth]);

  useEffect(() => {
    if (isMountedTwo.current) {
      //!
      updateChartData(lastDataUsedToMakeChart);
    } else {
      isMountedTwo.current = true;
    }
  }, [updatedWidth]);

  //!cannot get this to work just right
  useEffect(() => {
    if (viewFieldDuration === "365" || viewFieldDuration === "max") {
      setChartMinSecVisibility(false);
      //updateChartData(lastDataUsedToMakeChart);
    } else {
      setChartMinSecVisibility(true);
    }
  }, [viewFieldDuration]);

  // useEffect(() => {
  //   if (chartMinSecVisibility) {
  //     updateChartData(lastDataUsedToMakeChart);
  //   }
  // }, [chartMinSecVisibility]);

  return (
    <div className="chart-container">
      <div className="portfolio-chart-flex">
        <div className="portfolio-chart-with-controls-container">
          <PortfolioChartControls setViewFieldDuration={setViewFieldDuration} />
          <div className="chart"></div>
          <div className="screen"></div>
        </div>
      </div>
    </div>

    // <div className="portfolio-container">
    //   <div className="portfolio-details">
    //     <div>Portfolio Value</div>
    //     <div>Value</div>
    //     <div>Percent Change</div>

    //     {chartToggle ? (
    //       <div
    //         className="toggle-chart-button"
    //         onClick={() => {
    //           setChartToggle(!chartToggle);
    //         }}
    //       >
    //         View portfolio value
    //       </div>
    //     ) : (
    //       <div
    //         className="toggle-chart-button"
    //         onClick={() => {
    //           setChartToggle(!chartToggle);
    //         }}
    //       >
    //         View current coins
    //       </div>
    //     )}
    //   </div>
    //   <div className="portfolio-chart-flex">
    //     <PortfolioChartControls />
    //     {chartToggle ? (
    //       <LineChartComp
    //       /*accountBalanceChartData={accountData.accountBalanceChartData}*/
    //       />
    //     ) : (
    //       <DonutChart /*heldCoins={accountData?.heldCoins}*/ />
    //     )}
    //   </div>
    // </div>
  );
}
