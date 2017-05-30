import { gql } from 'react-apollo';

export default gql`
query GetCompetencyAchievements($user: ID!, $competency: ID!){
  Competency(id: $competency) {
    slug
    achievements
    (filter: {
      evaluatedUser: {id: $user}
    })
    {
      id
      createdAt
      level
      evaluatingUser { fullName }
    }
  }
}
`;