import React, { useCallback, useEffect } from "react";
import { IconButton, Input } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import queryState from "../../atoms/query";
import { GET_TWEETS } from "../../apollo-client/queries";
import { useLazyQuery } from "@apollo/client";
import tweetsState from "../../atoms/tweets";
import { debounce } from "lodash";
import updateTweets from "../../utils/update-tweets";

const CloseButton = styled(IconButton)`
  padding: 3px !important;
  color: gray;
  outline: none;

  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 728px) {
    padding: 6px !important;
  }
`;

function Header() {
  const [getTweets, { data, error, loading }] = useLazyQuery(GET_TWEETS);
  const [query, setQuery] = useRecoilState(queryState);
  const [_tweets, setTweets] = useRecoilState(tweetsState);

  const searchTweets = useCallback(
    debounce(
      () =>
        getTweets({
          variables: {
            tweet: {
              query,
            },
          },
        }),
      200
    ),
    [query]
  );

  useEffect(() => {
    searchTweets();
  }, [query]);

  const handleQueryChange = (query: string) => {
    setQuery(`#covid19india ${query}`);
  };

  useEffect(() => {
    updateTweets(setTweets, data, error, loading);
  }, [data, error, loading]);

  return (
    <header
      className={
        "border border-gray-200 py-4 px-1 md:px-8 flex flex-row items-center bg-white dark:bg-black dark:bg-opacity-40 dark:text-white dark:border-0"
      }
    >
      <p
        className={
          "text-2xl md:text-3xl lg:text-4xl text-gray font-bold justify-self-start dark:text-white "
        }
      >
        Tweeties
      </p>

      <div
        className={
          "m-auto w-3/5 md:w-4/6 flex justify-between items-center border-2 border-gray-300 rounded-xl py-1 px-3 dark:text-white dark:bg-gray-700"
        }
      >
        <p className={"flex items-center mr-2 dark:bg-gray-900"}>
          #covid19india
        </p>
        <Input
          className={"flex-grow -mb-0.5 dark:bg-gray-700"}
          disableUnderline
          value={query.split("#covid19india ")[1]}
          onChange={(event) => handleQueryChange(event.target.value)}
        />
        <CloseButton className={"close"}>
          <ClearIcon style={{ color: "black !important" }} />
        </CloseButton>
      </div>
    </header>
  );
}

export default Header;
