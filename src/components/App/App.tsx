import React from "react";
import { useRecoilState } from "recoil";
import tweetsState from "../../atoms/tweets";
import Spinner from "../Spinner/Spinner";
import Tweet from "react-tweet-embed";

function App() {
  const [tweets] = useRecoilState(tweetsState);

  return (
    <div>
      {tweets.loading && <Spinner />}
      {tweets.tweets.map((tweet) => (
        <Tweet id={tweet.id} key={tweet.id} />
      ))}
    </div>
  );
}

export default App;
