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
        $title: String!
        $public: Boolean!
        $release: Boolean!
    ){
        newEvent(
            data: {
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
        $date: String
        $dateEnd: String
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

const Edit_Host_MUTATION = gql`
  mutation editHost(
        $_id: String
        $name: String!
        $phone: String
        $email: String!
        $page: String
        $bank_code: String
        $bank_account: String
    ){
        editHost(
            data: {
                _id: $_id
                name: $name
                phone: $phone
                email: $email
                page: $page
                bank_code: $bank_code
                bank_account: $bank_account
            }
        )
    }
`

export { New_Form_MUTATION, New_Event_MUTATION, Edit_Host_MUTATION, Edit_Event_MUTATION, Event_RichEditor_MUTATION };
