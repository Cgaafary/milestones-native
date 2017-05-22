import { gql } from 'react-apollo';

export default gql`
query GetCompetenciesForUser ($user: ID!){
  allCompetencies {
    id
    slug
    title
    _achievementsMeta
    (filter: {evaluatedUser: {id: $user}}) 
    {
      count
    }
  }
}
`;