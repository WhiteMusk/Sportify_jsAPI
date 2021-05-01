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
      host_id
        title
        date
        location
        description
        registrationInfo
        trafficInfo
        prize
    }
  }
`

const GET_EVENTHOST_QUERY = gql`
  query ($event_id: String!) {
    getEventHost(event_id: $event_id) {
      bank_code
      bank_account
    }
  }
`

const Host_Events_QUERY = gql`
  query (
    $host_id: String!
  ) {
    hostEvents(host_id: $host_id) {
        _id
        title
        date
        public
        release
    }
  }
`

const Host_EventOverview_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        title
        public
        release
    }
  }
`

const Host_EventBasicInfo_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        title
        highlight
        date
        dateEnd
        location
        fee
    }
  }
`

const Host_RichEditor_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        description
        registrationInfo
        trafficInfo
        prize
    }
  }
`

const Host_RegistrationStatus_QUERY = gql`
  query (
    $event_id: String!
  ) {
    eventForms(event_id: $event_id) {
        _id
        applicant{
          name
          email
          phone
          studentID
          department
          notableResult
          lastFiveDigit
          transactionTime
          transactionName
          information
          otherInformation
          paid
      }
    }
  }
`

const Host_QUERY = gql`
  query (
    $host_id: String!
  ) {
    host(host_id: $host_id) {
      _id
      name
      phone
      email
      page
      bank_code
      bank_account
    }
  }
`

export {
  GET_EVENTS_QUERY, GET_EVENT_QUERY, Host_Events_QUERY, Host_QUERY, Host_EventOverview_QUERY,
  Host_RegistrationStatus_QUERY, Host_EventBasicInfo_QUERY, Host_RichEditor_QUERY, GET_EVENTHOST_QUERY
};
