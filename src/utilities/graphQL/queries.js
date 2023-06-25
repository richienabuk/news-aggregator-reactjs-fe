import { gql } from '@apollo/client';

export const GET_WELCOME = gql`
    query Welcome {
        welcome
    }
`;

export const GET_NEWS = gql`
    query LoadNews($categoryId: ID, $sourceId: ID, $publishedAt: DateRange, $searchTerm: String, $personalized: Boolean, $orderBy: [OrderByClause!], $page: Int, $first: Int! = 15) {
        news(category_id: $categoryId, source_id: $sourceId, published_at: $publishedAt, search_term: $searchTerm, personalized: $personalized, order_by: $orderBy, page: $page, first: $first) {
            data {
                id
                preview_image
                published_at
                title
                url
                source {
                    id
                    name
                }
                category {
                    id
                    name
                }
                description
                authors {
                    id
                    name
                }
            }
            paginatorInfo {
                count
                currentPage
                lastItem
                perPage
                total
                firstItem
                hasMorePages
                lastPage
            }
        }
    }
`;

export const GET_AUTHORS = gql`
    query LoadNews($name: String) {
        authors(name: $name) {
            id
            name
        }
    }
`;

export const GET_SOURCES = gql`
    query LoadSources($name: String) {
        sources(name: $name) {
            id
            name
        }
    }
`;

export const GET_CATEGORIES = gql`
    query LoadCategories($name: String) {
        categories(name: $name) {
            id
            name
        }
    }
`;

export const GET_PREFERENCES =  gql`
    query Account {
        me {
            id
            name
            email
            created_at
            preferences {
                id
                key
                value
            }
        }
    }
`;
