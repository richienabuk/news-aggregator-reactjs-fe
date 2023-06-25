import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation CreateUserMutation(
        $input: CreateUserInput!
    ) {
        createUser(
            input: $input
        ) {
            message
            access_token
            expires_at
            token_type
            user {
                id
                email
                name
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation LoginUser($input: LoginInput!) {
        loginUser(input: $input) {
            message
            access_token
            expires_at
            token_type
            user {
                id
                email
                name
            }
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation LogoutMutation {
        logout {
            status
            message
        }
    }
`;
