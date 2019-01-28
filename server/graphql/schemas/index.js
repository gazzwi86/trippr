const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String
    country: String!
    lists: [List!]!
  }

  input UserInput {
    _id: ID
    email: String!
    password: String!
    country: String!
    lists: [ListInput!]!
  }
  
  type Auth {
    userId: ID!
    token: String!
    tokenExpires: Int!
  }

  input AuthInput {
    email: String!
    password: String!
  }
  
  type List {
    _id: ID!
    name: String!
    creator: User!
    destinations: [Destination!]!
  }

  input ListInput {
    _id: ID
    name: String!
    destinations: [DestinationInput!]!
    creator: String!
  }

  type Destination {
    _id: ID!
    destination: String!
    duration: Int!
    list: List!
  }

  input DestinationInput {
    _id: ID
    destination: String!
    duration: Int!
    list: String!
  }

  type Country {
    _id: ID!
    name: String!
    code: String!
  }

  input CountryInput {
    _id: ID
    name: String!
    code: String!
  }

  type Holiday {
    _id: ID!
    date: String!
    name: String!
  }

  input HolidayInput {
    _id: ID
    date: String!
    name: String!
  }

  type RootQuery {
    users: [User!]!
    signinUser(authInput: AuthInput): Auth
    lists: [List!]!
    destinations: [Destination!]!
    countries: [Country!]!
    holidays: [Holiday!]!
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    updateUser(userInput: UserInput): User
    deleteUser(userId: ID!): ID!
    createList(listInput: ListInput): List
    updateList(listInput: ListInput): List
    deleteList(listId: ID!): ID!
    createDestination(destinationInput: DestinationInput): Destination
    updateDestination(destinationInput: DestinationInput): Destination
    deleteDestination(destinationId: ID!): ID!
    createCountry(countryInput: CountryInput): Country
    updateCountry(countryInput: CountryInput): Country
    deleteCountry(countryId: ID!): ID!
    createHoliday(holidayInput: HolidayInput): Holiday
    updateHoliday(holidayInput: HolidayInput): Holiday
    deleteHoliday(holidayId: ID!): ID!
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
