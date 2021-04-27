import { gql } from '@apollo/client';

const AllEvents_QUERY = gql`
  query {
    allEvents{
        _id
        title
        date
        location
    }
  }
`

const Event_QUERY = gql`
  query (
    $id: String!
  ) {
    event(id: $id) {
        title
        date
        location
        description
    }
  }
`

export { AllEvents_QUERY, Event_QUERY };