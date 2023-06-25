import { gql } from '@apollo/client';

export const GET_WELCOME = gql`
    query Welcome {
        welcome
    }
`;
