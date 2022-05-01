import React, { useState, useContext, useEffect, useRef } from "react";
import "./donutChart.css";
import { Donut, Legend } from "britecharts-react";
import Context from "../context/context";

export default function DonutChart() {
  const { accountData, setAccountData } = useContext(Context);
  //const [highlightedSlice, setHighlightedSlice] = useState();
  // const isMounted = useRef(false);
  const [indexedHeldCoins, setIndexedHeldCoins] = useState();
  const [animationToggle, setAnimationToggle] = useState(true);
  const isMounted = useRef(false);

  //!accoutn data held coins needs to look like this
  // [
  //   {
  //     quantity: 1,
  //     percentage: 50,
  //     name: "glittering",
  //     id: 1,
  //   },
  //   {
  //     quantity: 1,
  //     percentage: 50,
  //     name: "luminous",
  //     id: 2,
  //   },
  // ];

  //users current coin holdings
  const donutData = () => {
    return accountData.heldCoins;
  };

  const handleMouseOver = (data) => {
    console.log("Mouse Over");
    console.log(data);
    setAnimationToggle(false);
    //setHighlightedSlice(data.data.id);
  };

  const handleMouseOut = (data) => {
    setAnimationToggle(false);
    //setHighlightedSlice(99999);
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

  //sort heldCoins array and add color for donut
  useEffect(() => {
    // if (isMounted.current) {
    if (accountData) {
      const heldCoinsArray = accountData?.heldCoins;
      const sortedArrayDesc = heldCoinsArray.sort((a, b) => {
        return parseFloat(b.quantity) - parseFloat(a.quantity);
      });
      for (let i = 0; i < sortedArrayDesc.length; i++) {
        sortedArrayDesc[i].color = colorPalette[i];
      }
      console.log("sortedArrayDesc");
      console.log(sortedArrayDesc);
      //setIndexedHeldCoins(sortedArrayDesc);
      setAccountData({
        ...accountData,
        heldCoins: sortedArrayDesc,
      });
    }
    // } else {
    //   isMounted.current = true;
    // }
  }, []);

  const coinLegend = accountData.heldCoins?.map((coin) => {
    console.log("coin");
    console.log(coin);
    return (
      <div key={Math.floor(Math.random() * 10000)} className="legend-container">
        <div className="coin-color-pair">
          <div>{coin.symbol}</div>
          <div
            className="colored-dot"
            style={{ backgroundColor: coin.color }}
          ></div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (isMounted.current && animationToggle) {
      setAnimationToggle(false);
    } else {
      isMounted.current = true;
    }
  }, []);

  return (
    <div className="white-donut-container">
      {accountData && (
        <>
          <div className="donut-chart-inner-container">
            <Donut
              data={donutData}
              externalRadius={95}
              internalRadius={50}
              colorSchema={colorPalette}
              isAnimated={animationToggle}
              //width={200}
              // duration={1000}

              // margin={{
              //   top: 5,
              //   right: 50,
              //   bottom: 100,
              //   left: 5,
              // }}
              //!maybe add highlight slice later
              //highlightSliceById={highlightedSlice}
              // customMouseOver={handleMouseOver}
              // customMouseOut={handleMouseOut}
            />
            {/* <Legend
            data={donutData}
            height={200}
            width={200}
            // isHorizontal={true}
            margin={legendMargin}
            markerSize={10}
            //marginRatio={1.8}
            colorSchema={grey}
            highlightEntryById={highlightedSlice}
          /> */}
          </div>
          {/* <DonutLegend indexedHeldCoins={indexedHeldCoins} /> */}
          <div className="legend-container">{coinLegend}</div>

          {/* {indexedHeldCoins &&
            indexedHeldCoins?.map((coin) => {
              return (
                <div className="legend-container">
                  <div>{coin.symbol}</div>
                  <div className="colored-dot"></div>
                </div>
              );
            })} */}
        </>
      )}
    </div>
  );
}

//
//
//!nivo-works but no intro animation
// import React, { useEffect, useState } from "react";
// import { ResponsiveLine } from "@nivo/line";

// const dataArrayTwo = [
//   {
//     id: "japan",
//     color: "hsl(135, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 242,
//       },
//       {
//         x: "helicopter",
//         y: 101,
//       },
//       {
//         x: "boat",
//         y: 61,
//       },
//       {
//         x: "train",
//         y: 182,
//       },
//       {
//         x: "subway",
//         y: 77,
//       },
//       {
//         x: "bus",
//         y: 183,
//       },
//       {
//         x: "car",
//         y: 204,
//       },
//       {
//         x: "moto",
//         y: 99,
//       },
//       {
//         x: "bicycle",
//         y: 97,
//       },
//       {
//         x: "horse",
//         y: 195,
//       },
//       {
//         x: "skateboard",
//         y: 72,
//       },
//       {
//         x: "others",
//         y: 49,
//       },
//     ],
//   },
//   {
//     id: "france",
//     color: "hsl(249, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 164,
//       },
//       {
//         x: "helicopter",
//         y: 217,
//       },
//       {
//         x: "boat",
//         y: 87,
//       },
//       {
//         x: "train",
//         y: 148,
//       },
//       {
//         x: "subway",
//         y: 11,
//       },
//       {
//         x: "bus",
//         y: 75,
//       },
//       {
//         x: "car",
//         y: 126,
//       },
//       {
//         x: "moto",
//         y: 170,
//       },
//       {
//         x: "bicycle",
//         y: 181,
//       },
//       {
//         x: "horse",
//         y: 83,
//       },
//       {
//         x: "skateboard",
//         y: 14,
//       },
//       {
//         x: "others",
//         y: 286,
//       },
//     ],
//   },
//   {
//     id: "us",
//     color: "hsl(214, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 900,
//       },
//       {
//         x: "helicopter",
//         y: 106,
//       },
//       {
//         x: "boat",
//         y: 278,
//       },
//       {
//         x: "train",
//         y: 75,
//       },
//       {
//         x: "subway",
//         y: 22,
//       },
//       {
//         x: "bus",
//         y: 94,
//       },
//       {
//         x: "car",
//         y: 40,
//       },
//       {
//         x: "moto",
//         y: 154,
//       },
//       {
//         x: "bicycle",
//         y: 286,
//       },
//       {
//         x: "horse",
//         y: 193,
//       },
//       {
//         x: "skateboard",
//         y: 246,
//       },
//       {
//         x: "others",
//         y: 9,
//       },
//     ],
//   },
//   {
//     id: "germany",
//     color: "hsl(223, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 600,
//       },
//       {
//         x: "helicopter",
//         y: 4,
//       },
//       {
//         x: "boat",
//         y: 224,
//       },
//       {
//         x: "train",
//         y: 131,
//       },
//       {
//         x: "subway",
//         y: 69,
//       },
//       {
//         x: "bus",
//         y: 51,
//       },
//       {
//         x: "car",
//         y: 132,
//       },
//       {
//         x: "moto",
//         y: 145,
//       },
//       {
//         x: "bicycle",
//         y: 55,
//       },
//       {
//         x: "horse",
//         y: 399,
//       },
//       {
//         x: "skateboard",
//         y: 102,
//       },
//       {
//         x: "others",
//         y: 272,
//       },
//     ],
//   },
//   {
//     id: "norway",
//     color: "hsl(355, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 64,
//       },
//       {
//         x: "helicopter",
//         y: 184,
//       },
//       {
//         x: "boat",
//         y: 299,
//       },
//       {
//         x: "train",
//         y: 266,
//       },
//       {
//         x: "subway",
//         y: 444,
//       },
//       {
//         x: "bus",
//         y: 53,
//       },
//       {
//         x: "car",
//         y: 204,
//       },
//       {
//         x: "moto",
//         y: 77,
//       },
//       {
//         x: "bicycle",
//         y: 39,
//       },
//       {
//         x: "horse",
//         y: 187,
//       },
//       {
//         x: "skateboard",
//         y: 95,
//       },
//       {
//         x: "others",
//         y: 182,
//       },
//     ],
//   },
// ];
// export default function Wallet() {
//   const MyResponsiveLine = () => {
//     return (
//       <ResponsiveLine
//         data={dataArrayTwo}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: true,
//           reverse: false,
//         }}
//         yFormat=" >-.2f"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           orient: "bottom",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "transportation",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "count",
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         lineWidth={4}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemBackground: "rgba(0, 0, 0, .03)",
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     );
//   };

//   return (
//     <div style={{ height: "500px", width: "90%" }}>
//       <MyResponsiveLine />
//     </div>
//   );
// }
