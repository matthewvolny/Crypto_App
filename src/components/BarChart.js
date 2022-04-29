import React, { useState, useContext, useEffect, useRef } from "react";
import "./barChart.css";
import { Bar } from "britecharts-react";

export default function BarChart({ exchange }) {
  //!for 1 day timestamps are every 10 minutes (24 x6)
  //!for 1 week timestamps are every hour (24 x7)

  //users current coin holdings
  const barData = () => {
    return exchange.volume1Day;
    //!week data on button click
    //return exchangesInfo.volume1Week;
  };

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

  const [highlightBarFunction, setHighlightBarFunction] = useState();
  const [labelsSize, setLabelsSize] = useState();

  const handleHighlight = (data) => {
    return null;
  };

  // const handleLabelSize = (data) => {
  //   setLabelsSize(50);
  // };

  // SVGAElement.remove();

  // const svg = document.querySelector(".bar-chart");
  // const labelEl = svg.select(".metadata-group");
  // labelEl.attr("font-size", 5 + "px");
  //  .classed("percentage-label", true)
  //  .attr("x", labelXPosition)
  //  .attr("y", labelYPosition)
  //  .text(textFormatter)
  //  .attr("font-size", labelsSize + "px");

  return (
    // <div
    //   key={Math.floor(Math.random() * 10000)}
    //   className="bar-chart-container"
    // >
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
          isAnimated={true}
          width={225}
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
          percentageAxisToMaxRatio={1.3}
          //   usePercentage={true}
          //! does not work well nameLabel={50}
          //margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
        />
      </div>
      <div>Total Volume (24hr)</div>
      <div className="barchart-volume">{exchange.totalVolume1Day}</div>
    </div>
    // </div>
  );
}
