import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import tweetsState from "../../atoms/tweets";
import Spinner from "../Spinner/Spinner";
import LoadMore from "./LoadMore";
import { Tweet } from "react-twitter-widgets";
import { VisualPicker } from "react-rainbow-components";
import { COVID_19_INDIA } from "../../constants";
import ResourceOption from "../ResourceOption/ResourceOption";

function App() {
  const [tweets] = useRecoilState(tweetsState);
  const [loading, setLoading] = useState<boolean>(true);
  const [medicalResources, setMedicalResources] = useState<any>("oxygen");

  useEffect(() => {
    if (tweets.loading) setLoading(true);
  }, [tweets.loading, loading]);

  useEffect(() => {
    console.log("Tweets", tweets);
  }, [tweets]);

  const tweetOptions = {
    theme: "dark",
  };

  return (
    <div className={"flex justify-center flex-col pb-4"}>
      <VisualPicker
        id="visual-picker-component-1"
        label="Select Option"
        value={medicalResources}
      >
        <ResourceOption />
      </VisualPicker>
      {loading && <Spinner />}
      {tweets.tweets.map((tweet) => (
        <Tweet
          tweetId={tweet.id}
          key={tweet.id}
          options={tweetOptions}
          onLoad={() => setLoading(false)}
        />
      ))}

      <LoadMore loading={loading} />
    </div>
  );
}

export default App;
