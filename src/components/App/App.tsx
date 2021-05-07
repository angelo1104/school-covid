import React from "react";
import { useRecoilState } from "recoil";
import queryState from "../../atoms/query";
import tweetsState from "../../atoms/tweets";
import Spinner from "../Spinner/Spinner";
import TweetEmbed from "react-tweet-embed";

function App() {
  const [_query] = useRecoilState<string>(queryState);
  const [tweets] = useRecoilState(tweetsState);

  return (
    <div>
      {tweets?.loading && <Spinner />}
      {tweets?.tweets?.map((tweet, index) => (
        <TweetEmbed id={tweet?.id} key={index} />
      ))}
    </div>
  );
}

export default App;
