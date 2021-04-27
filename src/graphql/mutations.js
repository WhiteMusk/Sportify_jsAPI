import { gql } from '@apollo/client';

const New_Form_MUTATION = gql`
  mutation newForm(
        $event_id: String!
        $applicant: Applicant!
        $emergency_contact: EmergencyContact!
        $event_option: EventOption!
    ){
        newForm(
            data: {
                event_id: $event_id
                applicant: $applicant
                emergency_contact: $emergency_contact
                event_option: $event_option
            }
        )
    }
`

export { New_Form_MUTATION };