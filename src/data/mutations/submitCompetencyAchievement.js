import { gql } from 'react-apollo';

export default gql`
mutation SubmitCompetencyAchievement ($competency: ID!, $evaluatingUser: ID!, $evaluatedUser: ID!, $level: Int!) {
  createCompetencyAchievement(competencyId: $competency, level: $level, evaluatingUserId: $evaluatingUser, evaluatedUserId: $evaluatedUser) {
    id
    competency {
      slug
    }
    evaluatedUser {
      fullName
    },
    evaluatingUser {
      fullName
    }
    level
  }
}
`;