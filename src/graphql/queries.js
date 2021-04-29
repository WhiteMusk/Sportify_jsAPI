import { gql } from '@apollo/client';

const GET_EVENTS_QUERY = gql`
  query {
    getEvents {
        _id
        title
        date
        location
    }
  }
`

const GET_EVENT_QUERY = gql`
  query ($eventId: String!) {
    getEvent(eventId: $eventId) {
        title
        date
        location
        description
    }
  }
`

export { GET_EVENTS_QUERY, GET_EVENT_QUERY };