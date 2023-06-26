## News Aggregator ReactJS FE

React JS News aggregator website using GraphQL to fetch news from an API built with Laravel. API code is available at: [News Aggregator API](https://github.com/richienabuk/news-aggregator-api).

## Requirements
- GraphQL API
- Docker Desktop

## Installation
- Clone repository - `git clone git@github.com:richienabuk/news-aggregator-reactjs-fe.git`
- Add env values for `REACT_APP_GRAPHQL_API_URL`
- To use docker, run command `make sl` to start with logs or `make start` to start in detached mode
- Visit localhost with port specified in env file, default is `http://localhost:3000`

### Built by
- **[Imo-owo Nabuk](https://github.com/richienabuk)**

### Note
- Running this App with Docker on Mac M-series system throws an error - `"@esbuild/darwin-arm64" package platform` - and that's related to vite. Due to time constraint, I couldn’t find a way around it. Kindly use Windows or Linux for Docker or use the app without Docker.
