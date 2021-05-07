import Twitter from "../../twitter";
import GraphQLJSON from "graphql-type-json";
import { Tweet, TweetsInput } from "../typeDefs/typescript-types";

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    hi: () => "Hello world.",
    tweets: async (_req: any, { input }: { input: TweetsInput }) => {
      const { query, lastTweet } = input;

      interface Response {
        data: {
          statuses: Tweet[];
        };
      }

      try {
        const {
          data: { statuses: tweets },
        }: Response = (await Twitter.get("/search/tweets", {
          q: query,
          result_type: "mixed",
          count: 30,
          since_id: lastTweet || undefined,
        })) as Response;

        return tweets;
      } catch (error) {
        console.log(error);
        throw new Error("We encountered an error while getting tweets.");
      }
    },
  },
};

export default resolvers;
