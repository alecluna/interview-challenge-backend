const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input Pagination {
    skip: Int!
    take: Int!
  }

  type Color {
    id: ID!
    hexvalue: String!
    color: String!
    colors: [Color!]!
  }

  # Color and Color array is always non-nullable
  type Query {
    getColors: [Color!]!
    getColorsPaginate(pagination: Pagination): [Color!]!
    getColorID(id: ID!): Color!
    getColorName(color: String!): Color!
    getColorRandom: Color!
  }
`;

export default typeDefs;
