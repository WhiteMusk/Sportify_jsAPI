import { gql } from '@apollo/client';

const CREATE_FORM_MUTATION = gql`
  mutation addForm(
        $event_id: String!
        $applicant: Applicant!
        $emergency_contact: EmergencyContact!
        $event_option: EventOption!
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

export { CREATE_FORM_MUTATION };