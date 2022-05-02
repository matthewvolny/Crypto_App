import React, { useState, useContext } from "react";
import Context from "../context/context";
import SearchList from "./SearchList";
import { useNavigate } from "react-router-dom";
import magnifyingGlass from "../images/magnifying-glass.png";
import "./searchBar.css";

export default function SearchBar() {
  const { setSelectedCoinData, setCurrentRoute } = useContext(Context);
  const [value, setValue] = useState("");
  const [searchListVisibility, setSearchListVisibility] = useState(true);
  const [firstListItem, setFirstListItem] = useState();
  const [focus, setFocus] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearSearchBar = () => {
    setSearchListVisibility(false);
    setValue("");
    setSearchListVisibility(true);
  };

  const navigate = useNavigate();

  const typedValueSearch = (e) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(firstListItem.name);
    setSelectedCoinData(firstListItem);
    setFirstListItem();
    navigate(`/currencies/${firstListItem.name}`);
    setCurrentRoute("chart");
    setValue("");
  };

  return (
    <div className="searchbar-container">
      <form className="search-form" onSubmit={typedValueSearch}>
        <input
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChange={handleChange}
          value={value}
          type="text"
          placeholder="Search"
        />
        <img src={magnifyingGlass} alt="search-icon" />
      </form>
      {searchListVisibility && (
        <SearchList
          value={value}
          clearSearchBar={clearSearchBar}
          firstListItem={firstListItem}
          setFirstListItem={setFirstListItem}
          focus={focus}
        />
      )}
    </div>
  );
}
