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

  const FormatPercentChangeBitcoin = () => {
    if (bitcoinAndEthereumData?.bitcoinInfo?.percentChange24hr > 0) {
      return `+${bitcoinAndEthereumData?.bitcoinInfo?.percentChange24hr}`;
    } else {
      return `${bitcoinAndEthereumData?.bitcoinInfo?.percentChange24hr}`;
    }
  };

  const FormatPercentChangeEthereum = () => {
    if (bitcoinAndEthereumData?.ethereumCoinInfo?.percentChange24hr > 0) {
      return `+${bitcoinAndEthereumData?.ethereumCoinInfo?.percentChange24hr}`;
    } else {
      return `${bitcoinAndEthereumData?.ethereumCoinInfo?.percentChange24hr}`;
    }
  };

  return (
    <div className="bitcoin-and-ethereum-market-container">
      <div className="bitcoin-and-ethereum-headers">Bitcoin</div>
      <div className="bitcoin-price-and-percentage">
        <div className="btc-and-eth-market-price">
          $
          {Number(bitcoinAndEthereumData?.bitcoinInfo?.price).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </div>
        <div>
          <span className="bitcoin-and-ethereum-percent-parentheses">(</span>
          {<FormatPercentChangeBitcoin />}
          <span className="bitcoin-and-ethereum-percent-parentheses">)</span>
        </div>
      </div>
      <div className="bitcoin-market-volume">
        ${bitcoinAndEthereumData?.bitcoinInfo?.volume24hr.toLocaleString()}
      </div>
      <div className="bitcoin-and-ethereum-headers">Ethereum</div>
      <div className="ethereum-price-and-percentage">
        <div className="btc-and-eth-market-price">
          $
          {Number(
            bitcoinAndEthereumData?.ethereumCoinInfo?.price
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div>
          <span className="bitcoin-and-ethereum-percent-parentheses">(</span>
          {<FormatPercentChangeEthereum />}

          <span className="bitcoin-and-ethereum-percent-parentheses">)</span>
        </div>
      </div>
      <div className="ethereum-market-volume">
        ${bitcoinAndEthereumData?.ethereumCoinInfo?.volume24hr.toLocaleString()}
      </div>
    </div>
  );
}
