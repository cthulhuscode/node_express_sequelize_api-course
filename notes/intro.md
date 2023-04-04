**Run PostgreSQL db with Docker**

`docker-compose up -d postgres`

**Check running services**

`docker-compose ps`

**Turn off services**

`docker-compose down [service_name]`

**Access to the db**

1. `docker-compose exec postgres bash`

2. `psql -h localhost -d my_db enrique`

**Exit db**

`\q`

## Libs folder
Se encargan de conexión a servicios de terceros, ya sea APIs o DBs.