import { gql } from 'apollo-server-express';

export const user = gql`
  extend type Query {
    signIn(email: String!, password: String!): Model!
  }

  extend type Mutation {
    signUp(
      name: String!
      email: String!
      password: String!
      passwordConfirmation: String!
    ): Model!
  }

  type Model {
    accessToken: String!
  }
`;
