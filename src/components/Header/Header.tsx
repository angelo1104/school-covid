import React, { useCallback, useEffect } from "react";
import { IconButton, Input } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import queryState from "../../atoms/query";
import { GET_TWEETS } from "../../apollo-client/queries";
import { useLazyQuery } from "@apollo/client";
import tweetsState from "../../atoms/tweets";
import { debounce } from "lodash";

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
    console.log(data?.tweets[0]?.text, data?.tweets[0]?.id, error, loading);

    if (loading)
      setTweets({
        tweets: [],
        loading: loading,
        error: null,
      });

    if (error) {
      setTweets({
        tweets: [],
        loading: false,
        // @ts-ignore
        error: error,
      });
    }

    if (data?.tweets)
      setTweets({
        tweets: data.tweets,
        loading: false,
        error: null,
      });
  }, [data, error, loading]);

  return (
    <header
      className={
        "border border-gray-200 py-4 px-1 md:px-8 flex flex-row items-center bg-white"
      }
    >
      <p
        className={
          "text-2xl md:text-3xl lg:text-4xl text-gray font-bold justify-self-start"
        }
      >
        Tweeties
      </p>

      <div
        className={
          "m-auto w-3/5 md:w-4/6 flex justify-between items-center border-2 border-gray-300 rounded-xl py-1 px-3"
        }
      >
        <p className={"flex items-center mr-2"}>#covid19india</p>
        <Input
          className={"flex-grow -mb-0.5"}
          disableUnderline
          value={query.split("#covid19india ")[1]}
          onChange={(event) => handleQueryChange(event.target.value)}
        />
        <CloseButton>
          <Close />
        </CloseButton>
      </div>
    </header>
  );
}

export default Header;
