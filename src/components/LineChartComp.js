//!britcharts
import React, { useState, useContext } from "react";
import Context from "../context/context";
import { Line, Tooltip } from "britecharts-react";
import "./lineChart.css";

// const oneSet = () => ({
//   dataByTopic: [
//     {
//       topic: -1,
//       topicName: "Vivid",
//       dates: [
//         {
//           value: 0,
//           date: "2016-07-31T00:00:00-07:00",
//         },
//         {
//           value: 0,
//           date: "2016-08-01T00:00:00-07:00",
//         },
//         {
//           value: 3,
//           date: "2016-08-02T00:00:00-07:00",
//         },
//         {
//           value: 1,
//           date: "2016-08-03T00:00:00-07:00",
//         },
//         {
//           value: 3,
//           date: "2016-08-04T00:00:00-07:00",
//         },
//         {
//           value: 3,
//           date: "2016-08-05T00:00:00-07:00",
//         },
//         {
//           value: 0,
//           date: "2016-08-06T00:00:00-07:00",
//         },
//         {
//           value: 1,
//           date: "2016-08-07T00:00:00-07:00",
//         },
//         {
//           value: 1,
//           date: "2016-08-08T00:00:00-07:00",
//         },
//         {
//           value: 0,
//           date: "2016-08-09T00:00:00-07:00",
//         },
//         {
//           value: 3,
//           date: "2016-08-10T00:00:00-07:00",
//         },
//         {
//           value: 4,
//           date: "2016-08-11T00:00:00-07:00",
//         },
//         {
//           value: 4,
//           date: "2016-08-12T00:00:00-07:00",
//         },
//         {
//           value: 2,
//           date: "2016-08-13T00:00:00-07:00",
//         },
//         {
//           value: 3,
//           date: "2016-08-14T00:00:00-07:00",
//         },
//         {
//           value: 0,
//           date: "2016-08-15T00:00:00-07:00",
//         },
//         {
//           value: 1,
//           date: "2016-08-16T00:00:00-07:00",
//         },
//         {
//           value: 0,
//           date: "2016-08-17T00:00:00-07:00",
//         },
//         {
//           value: 2,
//           date: "2016-08-18T00:00:00-07:00",
//         },
//         {
//           value: 5,
//           date: "2016-08-19T00:00:00-07:00",
//         },
//         {
//           value: 1,
//           date: "2016-08-20T00:00:00-07:00",
//         },
//         {
//           value: 2,
//           date: "2016-08-21T00:00:00-07:00",
//         },
//         {
//           value: 9,
//           date: "2016-08-22T00:00:00-07:00",
//         },
//         {
//           value: 4,
//           date: "2016-08-23T00:00:00-07:00",
//         },
//         {
//           value: 3,
//           date: "2016-08-24T00:00:00-07:00",
//         },
//         {
//           value: 2,
//           date: "2016-08-25T00:00:00-07:00",
//         },
//         {
//           value: 5,
//           date: "2016-08-26T00:00:00-07:00",
//         },
//       ],
//     },
//   ],
// });

export default function LineChart() {
  const { accountData } = useContext(Context);

  const oneSet = () => ({
    dataByTopic: [
      {
        topic: -1,
        topicName: "Vivid",
        dates: accountData.accountBalanceChartData,
      },
    ],
  });

  const Chart = () => {
    const marginObject = {
      left: 100,
      right: 50,
      top: 100,
      bottom: 50,
    };

    //misc sample color schemas
    //https://github.com/britecharts/britecharts/blob/master/src/charts/helpers/color.js
    const grey = [
      "#F8F8FA",
      "#EFF2F5",
      "#D2D6DF",
      "#C3C6CF",
      "#ADB0B6",
      "#666A73",
      "#45494E",
      "#363A43",
      "#282C35",
    ];

    const pinkColor = ["#f866b9"];

    const colorGradients = {
      greenBlue: ["#39C7EA", "#4CDCBA"],
      orangePink: ["#FBC670", "#F766B8"],
      bluePurple: ["#3DC3C9", "#824a9e"],
    };

    const renderLine = (props) => (
      <Line
        isAnimated={false}
        colorSchema={pinkColor}
        lineGradient={colorGradients.bluePurple}
        //tooltipThreshold={1}
        //   color={red}
        //   aspectRatio={0.5}
        //colorSchema={grey} //!affects tooltip colorscheme
        //   dateLabel={fullDate}
        margin={marginObject}
        lineCurve="linear" //!does not work in {}
        width={500}
        height={700}
        {...props}
      />
    );

    //const logMouseOver = () => console.log("Mouse Over");
    return (
      <Tooltip
        data={oneSet}
        render={renderLine}
        topicLabel="topics"
        title="" //!can write a custom title here
        // nameLabel="name label"
      />
    );
  };

  return (
    <div className="line-container">
      <Chart />
    </div>
  );
}

//
//
//
////!britcharts

//     return (
//       <div>
//         <Donut
//           data={donutData}

//           colorSchema={grey}
//           isAnimated={false}
//           //width={200}
//           // duration={1000}
//           highlightSliceById={highlightedSlice}
//           customMouseOver={handleMouseOver}
//           customMouseOut={handleMouseOut}
//         />
//         <Legend
//           data={donutData}
//           height={200}
//           width={200}
//           //isHorizontal={true}
//           margin={legendMargin}
//           markerSize={10}
//           //marginRatio={1.8}
//           colorSchema={grey}
//           highlightEntryById={highlightedSlice}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="donut-container">
//       <Chart />
//     </div>
//   );
// }
