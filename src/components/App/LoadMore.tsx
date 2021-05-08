import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import tweetsState from "../../atoms/tweets";
import Spinner from "../Spinner/Spinner";
import { debounce } from "lodash";
import { useLazyQuery } from "@apollo/client";
import { GET_TWEETS } from "../../apollo-client/queries";
import queryState from "../../atoms/query";

const LoadMoreButton = styled.button`
  width: 200px;
  border-radius: 1000px;
  margin: 30px auto;
  outline-width: 0;

  :focus {
    outline-width: 0;
  }

  :hover {
    filter: brightness(95%);
  }
`;

interface Props {
  loading: boolean;
}

function LoadMore({ loading }: Props) {
  const [tweets, setTweets] = useRecoilState(tweetsState);
  const [loaded, setLoaded] = useState(false);
  const [query] = useRecoilState(queryState);
  const [getTweets, { data, error, loading: loadMore }] = useLazyQuery(
    GET_TWEETS
  );

  useEffect(() => {
    if (!loading && tweets.tweets.length) setLoaded(true);
    else if (tweets.tweets.length) setLoaded(false);
  }, [loading]);

  useEffect(() => {
    if (loadMore)
      setTweets({
        tweets: tweets.tweets,
        loading: loadMore,
        error: null,
      });

    if (error) {
      setTweets({
        tweets: tweets.tweets,
        loading: false,
        // @ts-ignore
        error: error,
      });
    }

    if (data?.tweets)
      setTweets({
        tweets: [...tweets.tweets, ...data?.tweets],
        loading: false,
        error: null,
      });
  }, [data, error, loadMore]);

  const searchTweets = useCallback(
    debounce(
      () =>
        getTweets({
          variables: {
            tweet: {
              query,
              lastTweet: tweets.tweets[tweets.tweets.length - 1],
            },
          },
        }),
      200
    ),
    [query]
  );

  const fetchMoreTweets = () => {
    searchTweets();
  };

  return (
    <>
      {loading && loaded && <Spinner />}

      {loaded && (
        <LoadMoreButton
          className={"bg-blue-500 text-white py-1"}
          onClick={fetchMoreTweets}
        >
          Load More
        </LoadMoreButton>
      )}
    </>
  );
}

export default LoadMore;
