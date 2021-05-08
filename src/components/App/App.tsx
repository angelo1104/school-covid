import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import tweetsState from "../../atoms/tweets";
import Spinner from "../Spinner/Spinner";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Tweet = dynamic(
  // @ts-ignore
  () => import("react-twitter-widgets").then((module) => module.Tweet),
  {
    loading: () => <Skeleton height={400} />,
  }
);

const LoadMoreButton = styled.button`
  width: 200px;
  border-radius: 1000px;
  margin: 30px auto;

  :hover {
    filter: brightness(95%);
  }
`;

function App() {
  const [tweets] = useRecoilState(tweetsState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tweets.loading) setLoading(true);
    console.log("loader", loading);
  }, [tweets.loading, loading]);

  return (
    <div className={"flex justify-center flex-col pb-4"}>
      {loading && <Spinner />}
      {tweets.tweets.map((tweet) => (
        <Tweet
          tweetId={tweet.id}
          key={tweet.id}
          onLoad={() => setLoading(false)}
        />
      ))}

      {!loading && (
        <LoadMoreButton className={"bg-blue-500 text-white py-1"}>
          Load More
        </LoadMoreButton>
      )}
    </div>
  );
}

export default App;
