import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Context from "../context/context";
import "./searchList.css";

export default function DropdownItem({
  item,
  fetchCoinDescription,
  //setSelectedCoinData,
  setAllResultsVisibility,
  selectedCoinDataWithDescription,
  clearSearchBar,
  clearDropdownList,
}) {
  const { selectedCoinData, setSelectedCoinData, setCurrentRoute } =
    useContext(Context);
  return (
    <div
      className="search-item"
      onMouseEnter={() => {
        console.log("item on hover");
        console.log(item);
        fetchCoinDescription(item); //not always correct for 2+ coin in list
      }}
    >
      <NavLink
        className="search-dropdown-navlink"
        onClick={() => {
          setCurrentRoute("chart");
          setSelectedCoinData(selectedCoinDataWithDescription);
          console.log(selectedCoinData);
          clearSearchBar();
          clearDropdownList();
        }}
        to={`/currencies/${item.name}`}
      >
        <div className="search-item-icon-container">
          <img className="icon" alt="search-icon" src={item.image} />
        </div>
        <div className="search-item-name-and-symbol-container">
          <div className="search-item-name">{item.name}</div>
          <div className="search-item-symbol">{item.symbol.toUpperCase()}</div>
        </div>
        <div className="search-item-rank">#{item.rank}</div>
      </NavLink>
    </div>
  );
}
