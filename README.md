# Klipfolio Project Assessment  [![CI/CD pipeline](https://github.com/piopi/project-KF/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/piopi/project-KF/actions/workflows/push.yml) [![Deploy](https://github.com/piopi/project-KF/actions/workflows/deploy.yml/badge.svg)](https://github.com/piopi/project-KF/actions/workflows/deploy.yml)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#cicd">CI/CD Pipeline with Github Actions</a></li>
    <li><a href="#api">API Endpoints</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Overview
This is a project assessment of my full stack skills for Klipfolio. In this project, I implemented all the requirements of the mock design and some additional functionalities on the backend and frontend of the application. (See [Features Section](#features))
### Screenshots
**Normal mode:**
![Normal Mode](/assets/Klipfolio-Assessment.png)
**Dark mode**
![Dark Mode](/assets/Klipfolio-Assessment-Dark.png)
**Search function**
![Search function](/assets/SearchFunction.png)


### Built With

* [React.js](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Chakra-UI](https://chakra-ui.com/)
* [Redux](https://redux.js.org/)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://www.express.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

**Deployed on Heroku**

## Getting Started

You can either run the app locally or head over (for a live version) : 
https://assessment-klipfolio.herokuapp.com/
#### Running Application Locally

##### Requirement:
- [Docker](https://docs.docker.com/get-docker/)

At the root of the folder, run the following command:
```
docker-compose up -d
```
You access the react app at: `http://localhost:3000`
And the server at: `http://localhost:3001`

## Features

- Fully Responsive Application
- Dark mode
- RestAPI that fetches from the Database (PostgreSQL)
- Search and filter functionalities
- Data represented in graphs using ChartJS
- Containerized application for quick development and deployment
- CI/CD Pipeline for linting and testing 
- Auto-deployement to Heroku with GitHub Actions

<a id="cicd" > </a>
## CI/CD Pipeline with Github Actions

When a pull request is made:
Stages:
1. Build Images
2. Lint Server & Client
3. Test Server & Client (Integration & Unit tests)

When a push is made on the main branch:
- Build Docker image and auto Deploy to Heroku

<a id="api" > </a>
## API Endpoints
* **Get all services** : `GET /api/services/`

  ```
   Example of output:
  [
    {
    "serviceId": 1,
    "name": "Facebook",
    "serviceIconUrl": "url",
    "createdAt": "2021-11-08T00:39:13.647Z",
    "updatedAt": "2021-11-08T00:39:13.647Z"
    }
  ]
  ```
* **Get all data sources of a service** : `GET /api/datasources?serviceId=:id`
  ```
   Example of output:
   [
    {
    "dataId": 1,
    "dataName": "Ad Revenue",
    "dataCurrency": "$",
    "createdAt": "2021-11-08T00:39:13.677Z",
    "updatedAt": "2021-11-08T00:39:13.677Z",
    "serviceId": 1,
    "ServiceServiceId": null
    }
  ]
  ```
* **Get all data entries of a data source** : `GET /api/dataentries?dataId=:id&limit=:number`
```
   Example of output:
   {
    "data": [
    471.17,
    238.78,
    313.21,
    341.55,
    252.24,
    324.72,
    303.16,
    413.09,
    384.74,
    279.82
    ],
    "dataEntryName": "Ad Profit",
    "dataCurrency": "$"
    }
```
