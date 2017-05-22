import { gql } from 'react-apollo';

export default gql`
mutation SubmitEvaluation ($achieved: Boolean!, $evaluatedUser: ID!, $evaluatingUser: ID!, $milestone: ID!) {
  createEvaluation(achieved: $achieved, evaluatedUserId: $evaluatedUser, evaluatingUserId: $evaluatingUser, milestoneId: $milestone) {
    id
    achieved
    milestone {
      level
      description
    }
  }
}
`;