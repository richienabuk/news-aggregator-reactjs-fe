## News Aggregator ReactJS FE

React JS News aggregator website using GraphQL to fetch news from an API built with Laravel. API code is available at: [News Aggregator API](https://github.com/richienabuk/news-aggregator-api).

## Requirements
- GraphQL API
- Docker Desktop

## Installation
- Clone repository - `git clone git@github.com:richienabuk/news-aggregator-reactjs-fe.git`
- Add env values for `REACT_APP_GRAPHQL_API_URL`, `APP_PORT` (optional)
- To use docker, run command `make sl` to start with logs or `make start` to start in detached mode
- Visit localhost with port specified in env file, default is 3000

### Built by
- **[Imo-owo Nabuk](https://github.com/richienabuk)**

### Note
App setup is for development mode at the moment. Changes for deployment to production environment to be added at a later time.
