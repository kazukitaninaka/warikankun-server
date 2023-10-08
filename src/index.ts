import { ApolloServer } from "apollo-server-cloud-functions";
import "reflect-metadata";
import { EventResolver } from "./events";
import { PaymentResolver } from "./payments";
import { ParticipantResolver } from "./participants";
import { buildSchemaSync } from "type-graphql";

const schema = buildSchemaSync({
  resolvers: [EventResolver, PaymentResolver, ParticipantResolver],
  // deploy時はコメントアウト
  // emitSchemaFile: true,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true, // see below for more about this
  cache: "bounded",
  introspection: true,
});

export const handler = server.createHandler({});
