import React, { useContext, useEffect, useState } from "react";
import DropdownItem from "./DropdownItem";
import Context from "../context/context";
import axios from "axios";
import "./searchList.css";

export default function SearchList({
  value,
  list,
  clearSearchBar,
  firstListItem,
  setFirstListItem,
  focus,
  closeSearchlistAfterSelection,
}) {
  // console.log(value, list);
  const { coinData, setSelectedCoinData } = useContext(Context);
  const [filteredList, setFilteredList] = useState([]);
  const [allResultsVisibility, setAllResultsVisibility] = useState(false);
  const [selectedCoinDataWithDescription, setSelectedCoinDataWithDescription] =
    useState();
  const [toggle, setToggle] = useState();

  //adds "description" to coin selectedCoinInfo
  const fetchCoinDescription = (coin) => {
    // console.log("in fetchCoinDescription");
    // console.log(coin);
    // console.log(coin.id);
    let selectedCoinInfo = coin;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.id}`)
      .then((response) => {
        const data = response.data;
        selectedCoinInfo.description = data.description.en;
        if (toggle) {
          console.log("in first list item fetch");
          setFirstListItem(selectedCoinInfo);
        } else {
          console.log("in else fetch");
          setSelectedCoinDataWithDescription(selectedCoinInfo);
        }
      });
  };

  //returns list of coins that match search input
  useEffect(() => {
    if (value) {
      const filteredList = coinData.filter((item) => {
        return item.name
          .toString()
          .toLowerCase()
          .startsWith(value.toLowerCase());
      });
      console.log("filteredList");
      console.log(filteredList);
      setFilteredList(filteredList);
    }
  }, [value]);

  useEffect(() => {
    if (filteredList.length !== 0) {
      setToggle(true);
      // console.log("filtered list first item");
      // console.log(filteredList[0]);
      // fetchCoinDescription(filteredList[0]);
    }
  }, [filteredList]);

  useEffect(() => {
    if (toggle) {
      fetchCoinDescription(filteredList[0]);
      setToggle();
    }
  }, [toggle]);

  const clearDropdownList = () => {
    setAllResultsVisibility(false);
    closeSearchlistAfterSelection();
  };

  const noResultsMessage = (
    <div>
      <div>No results for '{value}'</div>
      <div>We couldn't find anything matching your search.</div>
      <div>Try again with a different term.</div>
    </div>
  );

  const limitSizeOfSearchListContainer = () => {
    const searchListContainer = document.querySelector(
      ".search-list-container"
    );
    searchListContainer.setAttribute("id", "set-max-height");
  };

  return (
    <div className="search-list-container">
      {/* //!for "!value" put infocus for search bar */}
      {focus && !value ? (
        //!could have trending coins here
        // <div>Trending Coins...</div>
        <></>
      ) : filteredList?.length === 0 && value ? (
        noResultsMessage
      ) : (
        filteredList?.length > 0 &&
        // focus &&
        filteredList?.map((item, index) => {
          if (allResultsVisibility) {
            return (
              <DropdownItem
                key={Math.floor(Math.random() * 10000)}
                item={item}
                fetchCoinDescription={fetchCoinDescription}
                //setSelectedCoinData={setSelectedCoinData}
                // setAllResultsVisibility={allResultsVisibility}
                selectedCoinDataWithDescription={
                  selectedCoinDataWithDescription
                }
                clearSearchBar={clearSearchBar}
                clearDropdownList={clearDropdownList}
              />
            );
          } else {
            if (index < 4) {
              return (
                <DropdownItem
                  key={Math.floor(Math.random() * 10000)}
                  item={item}
                  fetchCoinDescription={fetchCoinDescription}
                  //setSelectedCoinData={setSelectedCoinData}
                  // setAllResultsVisibility={allResultsVisibility}
                  selectedCoinDataWithDescription={
                    selectedCoinDataWithDescription
                  }
                  clearSearchBar={clearSearchBar}
                  clearDropdownList={clearDropdownList}
                />
              );
            }
          }
        })
      )}
      {!allResultsVisibility && value /*&& focus*/ && (
        <div
          className="search-dropdown-see-all"
          onClick={() => {
            console.log("clicked");
            limitSizeOfSearchListContainer();
            setAllResultsVisibility(true);
          }}
        >
          See all results <span className="search-dropdown-parentheses">(</span>
          {filteredList.length > 0 && filteredList.length}
          <span className="search-dropdown-parentheses">)</span>
        </div>
      )}
    </div>
  );
}
