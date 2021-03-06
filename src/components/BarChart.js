import React, { useState, useContext, useEffect, useRef } from "react";
import "./barChart.css";
import { Bar } from "britecharts-react";
import Context from "../context/context";

export default function BarChart({ exchange }) {
  const {
    barChartRerenderAtLoginClick,
    setBarChartRerenderAtLoginClick,
    barChartRerenderAtHomeHover,
    setBarChartRerenderAtHomeHover,
    currentRoute,
    pageWidth,
    reRenderBarChart,
  } = useContext(Context);
  //const [highlightBarFunction, setHighlightBarFunction] = useState();
  //const [labelsSize, setLabelsSize] = useState();
  const [animationToggle, setAnimationToggle] = useState(false);
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const [updatedWidth, setUpdatedWidth] = useState(225);

  //!for 1 day timestamps are every 10 minutes (24 x6)
  //!for 1 week timestamps are every hour (24 x7)

  //users current coin holdings
  const barData = () => {
    return exchange.volume1Day;
    //!week data on button click
    //return exchangesInfo.volume1Week;
  };
  // const [exchangeVolume1Day, setExchangeVolume1Day] = useState();

  // useEffect(() => {
  //   setExchangeVolume1Day(exchange.volume1Day);
  // }, [exchange]);

  //misc sample color schemas
  //https://github.com/britecharts/britecharts/blob/master/src/charts/helpers/color.js
  const colorPalette = [
    "#6aedc7", //green
    "#39c2c9", //blue
    "#ffce00", //yellow
    "#ffa71a", //orange
    "#f866b9", //pink
    "#998ce3", //purple
  ];

  // barChart.highlightBarFunction(null); // will disable the default highlight effect

  const handleHighlight = (data) => {
    return null;
  };

  //!hovering over home with market open gives a flicker (did not work, could be recombined)
  // useEffect(() => {
  //   if (
  //     isMountedTwo.current ||
  //     barChartRerenderAtLoginClick ||
  //     barChartRerenderAtHomeHover
  //   ) {
  //     setAnimationToggle(false);
  //   } else {
  //     isMountedTwo.current = true;
  //     setBarChartRerenderAtLoginClick(true);
  //   }
  // }, [barChartRerenderAtLoginClick, barChartRerenderAtHomeHover]);

  // const [reRenderBarChart, setReRenderBarChart] = useState ();

  //!will kill all animations
  useEffect(() => {
    //set "true initially", login form turns to false
    if (reRenderBarChart) {
      setAnimationToggle(true);
    }
  }, []);

  //
  useEffect(() => {
    if (isMounted.current) {
      if (pageWidth < 1165) {
        setUpdatedWidth(225);
      } else if (pageWidth >= 1165 && pageWidth < 1235) {
        setUpdatedWidth(245);
      } else if (pageWidth >= 1235 && pageWidth < 1315) {
        setUpdatedWidth(260);
      } else if (pageWidth >= 1315) {
        setUpdatedWidth(275);
      }
    } else {
      isMounted.current = true;
    }
  }, [pageWidth]);

  // useEffect(() => {
  //   if (isMountedTwo.current) {
  //     setExchangeVolume1Day(exchange.volume1Day);
  //   } else {
  //     isMountedTwo.current = true;
  //   }
  // }, [updatedWidth]);

  return (
    <div
      key={Math.floor(Math.random() * 10000)}
      className="bar-chart-inner-container"
    >
      <div className="exchange-image-and-name-container">
        <div className="exchange-icon-and-rank-flex">
          <div>
            <img src={exchange.image} alt="exchange-icon" />
          </div>
          <div className="exchange-rank">
            Rank&nbsp;# {exchange.trustScoreRank}
          </div>
        </div>
        {/* <div>{exchange.name}</div> */}
      </div>
      <div className="bar-chart-actual-container">
        <Bar
          data={barData}
          colorSchema={colorPalette}
          isAnimated={animationToggle}
          width={updatedWidth}
          height={150}
          yTicks={3}
          labelsSize={2}
          highlightBarFunction={handleHighlight}
          //may be good to try
          //betweenBarsPadding={0.3}
          //!label size not working
          //labelsSize={10}
          //labelsMargin={}
          //labelsNumberFormat={"."}
          //numberFormat={}

          //valueLabel={}
          //!does not seem to work
          //hasSingleBarHighlight={false}
          percentageAxisToMaxRatio={1.1}
          //   usePercentage={true}
          //! does not work well nameLabel={50}
          //margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
        />
      </div>
      <div className="barchart-volume-header">Total Volume (24hr)</div>
      <div className="barchart-volume">
        ${Number(exchange.totalVolume1Day).toLocaleString("en-US")}
      </div>
    </div>
    // </div>
  );
}
