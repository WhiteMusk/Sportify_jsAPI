import { gql } from '@apollo/client';

const CREATE_FORM_MUTATION = gql`
  mutation addForm(
        $event_id: String!
        $applicant: ApplicantInput!
        $emergency_contact: EmergencyContactInput
        $event_option: EventOptionInput
    ){
        addForm (
            data: {
                event_id: $event_id
                applicant: $applicant
                emergency_contact: $emergency_contact
                event_option: $event_option
            }
        )
    }
`

const New_Event_MUTATION = gql`
  mutation newEvent(
        $host_id: String!
        $title: String!
        $public: Boolean!
        $release: Boolean!
    ){
        newEvent(
            data: {
                host_id: $host_id
                title: $title
                public: $public
                release: $release
            }
        )
    }
`

const Edit_Event_MUTATION = gql`
    mutation editEvent(
        $_id: String!
        $title: String!
        $highlight: String
        $date: Date
        $dateEnd: Date
        $location: String
        $fee: Int
    ){
        editEvent(
            data: {
                _id: $_id
                title: $title
                highlight: $highlight
                date: $date
                dateEnd: $dateEnd
                location: $location
                fee: $fee
            }
        )
    }
`

const Event_RichEditor_MUTATION = gql`
    mutation saveRichEditor(
        $_id: String!
        $description: String
        $registrationInfo: String
        $trafficInfo: String
        $prize: String
    ){
        saveRichEditor(
            data: {
                _id: $_id
                description: $description
                registrationInfo: $registrationInfo
                trafficInfo: $trafficInfo
                prize: $prize
            }
        )
    }
`

export const LOGIN_CHECK_MUTATION = gql`
  mutation loginCheck(
        $email: String!
        $password: String!
    ){
        loginCheck(
            data: {
                email: $email
                password: $password
            }
        )
    }
`

export const ADD_HOST_MUTATION = gql`
  mutation addHost(
        $name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        addHost(
            data: {
                name: $name
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        )
    }
`

const Edit_Host_MUTATION = gql`
  mutation editHost(
        $_id: String
        $name: String!
        $email: String!
        $password: String
        $googleId: String
        $phone: String
        $page: String
        $bank_code: String
        $bank_account: String
    ){
        editHost(
            data: {
                _id: $_id
                name: $name
                email: $email
                password: $password
                googleId: $googleId
                phone: $phone
                page: $page
                bank_code: $bank_code
                bank_account: $bank_account
            }
        )
    }
`

const Host_SetPaidStatus_MUTATION = gql`
  mutation setPaidStatus(
        $_id: String
        $applicant: ApplicantInput!
    ){
        setPaidStatus(
            data: {
                _id: $_id
                applicant: $applicant
            }
        )
    }
`

export { CREATE_FORM_MUTATION, New_Event_MUTATION, Edit_Host_MUTATION, Edit_Event_MUTATION, Event_RichEditor_MUTATION, Host_SetPaidStatus_MUTATION };

