# project-KF

## Running Application Locally

### Requirement:
- [Docker](https://docs.docker.com/get-docker/)

At the root of the folder, run the following command:
```
docker-compose up -d
```
## CI/CD Pipeline with Github Actions

Stages:
1. Build Images
2. Lint Server & Client
3. Test Server & Client (Integration & Unit tests)

## Api enpoints
* **Get all services** : `GET /api/services/`
* **Get all data sources of a service** : `GET /api/datasources?serviceId=:id`
* **Get all data entries of a data source** : `GET /api/dataentries?dataId=:id`