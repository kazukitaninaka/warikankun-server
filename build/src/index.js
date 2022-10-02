"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const apollo_server_cloud_functions_1 = require("apollo-server-cloud-functions");
require("reflect-metadata");
const events_1 = require("./events");
const payments_1 = require("./payments");
const participants_1 = require("./participants");
const type_graphql_1 = require("type-graphql");
const schema = (0, type_graphql_1.buildSchemaSync)({
    resolvers: [events_1.EventResolver, payments_1.PaymentResolver, participants_1.ParticipantResolver],
});
const server = new apollo_server_cloud_functions_1.ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
});
exports.handler = server.createHandler({});
