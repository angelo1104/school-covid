import React from "react";
import { IconButton, Input } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import queryState from "../../atoms/query";
import { COVID_19_INDIA } from "../../constants";
import { Search } from "@material-ui/icons";
import filtersState from "../../atoms/filters";
import { useRecoilState } from "recoil";

const CloseButton = styled(IconButton)`
  padding: 3px !important;
  outline: none;

  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 728px) {
    padding: 6px !important;
  }
`;

const SearchInput = styled(Input)`
  color: #d9d9d9 !important;
  caret-color: #d9d9d9;
`;

function Header() {
  const [query, setQuery] = useRecoilState(queryState);
  const [filters, setFilters] = useRecoilState(filtersState);

  const handleQueryChange = (query: string) => {
    setQuery(`${COVID_19_INDIA}${query}`);
  };

  return (
    <header
      className={
        "py-4 px-1 md:px-8 flex flex-row items-center border border-1 border-gray"
      }
    >
      <p
        className={
          "text-2xl md:text-3xl lg:text-4xl font-bold justify-self-start color-gray"
        }
      >
        Tweeties
      </p>

      <div
        className={
          "m-auto w-3/5 md:w-4/6 flex justify-between items-center rounded-xl py-1 px-3 background-gray"
        }
      >
        <Search className={"color-gray"} />
        <p
          className={
            "flex items-center mx-2 color-gray whitespace-wrap lg:whitespace-nowrap"
          }
        >
          {COVID_19_INDIA} {filters.join(" ")}
        </p>
        <SearchInput
          className={"flex-grow -mb-0.5"}
          disableUnderline
          value={query.split(COVID_19_INDIA)[1]}
          onChange={(event) => handleQueryChange(event.target.value)}
        />
        <CloseButton
          className={"close"}
          onClick={() => {
            setQuery(COVID_19_INDIA);
            setFilters([]);
          }}
        >
          <ClearIcon className={"color-gray"} />
        </CloseButton>
      </div>
    </header>
  );
}

export default Header;
