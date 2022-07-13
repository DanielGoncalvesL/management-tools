import { gql } from 'apollo-server-express';

export const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
