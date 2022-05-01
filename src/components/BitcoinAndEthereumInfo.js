import React, { useEffect, useState } from "react";
import "./bitcoinAndEthereumInfo.css";

export default function BitcoinAndEthereumInfo({ coinData }) {
  const [bitcoinAndEthereumData, setBitcoinAndEthereumData] = useState();

  useEffect(() => {
    const bitCoinInfo = coinData?.find((coin) => {
      return coin.id === "bitcoin";
    });
    console.log("bitCoinInfo");
    console.log(bitCoinInfo);
    const ethereumCoinInfo = coinData?.find((coin) => {
      return coin.id === "ethereum";
    });
    console.log("ethereumCoinInfo");
    console.log(ethereumCoinInfo);
    setBitcoinAndEthereumData({
      bitcoinInfo: bitCoinInfo,
      ethereumCoinInfo: ethereumCoinInfo,
    });
  }, [coinData]);

  return (
    <div>
      <div className="bitcoin-and-ethereum-headers">Bitcoin</div>
      <div>
        $
        {Number(bitcoinAndEthereumData?.bitcoinInfo?.price).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </div>
      <div>{bitcoinAndEthereumData?.bitcoinInfo?.percentChange24hr}</div>
      <div>
        ${bitcoinAndEthereumData?.bitcoinInfo?.volume24hr.toLocaleString()}
      </div>
      <div className="bitcoin-and-ethereum-headers">Ethereum</div>
      <div>
        $
        {Number(bitcoinAndEthereumData?.ethereumCoinInfo?.price).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </div>
      <div>{bitcoinAndEthereumData?.ethereumCoinInfo?.percentChange24hr}</div>
      <div>
        ${bitcoinAndEthereumData?.ethereumCoinInfo?.volume24hr.toLocaleString()}
      </div>
    </div>
  );
}
