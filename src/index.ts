import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { EventResolver } from "./events";
import { PaymentResolver } from "./payments";
import { ParticipantResolver } from "./participants";
import { buildSchema } from "type-graphql";

const app = async () => {
  const schema = await buildSchema({
    resolvers: [EventResolver, PaymentResolver, ParticipantResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true, // see below for more about this
    cache: "bounded",
    cors: {
      origin: ["http://localhost:3000", "https://warikankun.vercel.app"],
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

app();
