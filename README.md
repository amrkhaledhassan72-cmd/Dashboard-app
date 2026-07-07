# Vehicle Organiser

The Vehicle Organiser System is a React Redux project designed for managing vehicles data. This README provides an overview of the project and instructions on how to set it up using Docker Compose.

#### [Check out the Documentation in GitHub Pages site](https://dspchathuranga.github.io/vehicle-organiser/)

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [User Guid](#user-guid)

## Project Overview

The Vehicle Organiser System is a React Redux application that provides CRUD (Create, Read, Update, Delete) operations for vehicle data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [node](https://nodejs.org/en/download) 14 or later 
- [nmp](https://nodejs.org/en/download) 6 or later
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with the Vehicle Organiser System, follow these steps:

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/dspchathuranga/vehicle-organiser.git
    ```
    
2. You can change env `Dockerfile` file in the project directory:

    ```Dockerfile
    FROM node:18-alpine

    WORKDIR /app

    COPY package.json .
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000 4000
    
    # CMD ["npm", "run", "prod"]
    CMD ["npm", "run", "dev"]
    ```
3. You can change port's and image version `docker-compose.yaml` file in the project directory:

    ```yaml
    version: "3.8"
    services:
      vehicle-organiser:
      build: .
      container_name: vehicle-organiser
      image: vehicle-organiser-image:1.0
      ports:
        - "3000:3000"  # React app port
        - "4000:4000"  # JSON Server port
      #stdin_open: true
    ```
    
4. Start the application and database services using Docker Compose:

    ```sh
    docker-compose up
    ```

The application will be accessible at `http://localhost:3000`

<!-- 
## Running Tests

Testing is an essential part of ensuring the quality and correctness of the Student Management System. We use [JUnit](https://junit.org/junit5/) in combination with [Spring Test](https://spring.io/guides/gs/testing/).

Before running the tests, make sure the `application.properties` configuration:

```properties
# Database Configuration
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/postgres}
spring.datasource.username=${DATABASE_USERNAME:postgres}
spring.datasource.password=${DATABASE_PASSWORD:postgres}

# Flyway Configuration
spring.flyway.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/postgres}
spring.flyway.user=${DATABASE_USERNAME:postgres}
spring.flyway.password=${DATABASE_PASSWORD:postgres}
```

#### Using Maven

For Maven-based projects, execute the following command in your project's root directory:

```shell
mvn test
``` -->

## User Guid

1. Register
   
   ![Register](https://github.com/dspchathuranga/vehicle-organiser/assets/5466387/3478d0be-9e8d-4680-9225-4a209c8bce3f)

2. Login

   ![Login](https://github.com/dspchathuranga/vehicle-organiser/assets/5466387/88c15588-6fb2-4dd7-a534-7a2fa0b4a3e0)
   
3. Add Equipment

   ![Add Equipment](https://github.com/dspchathuranga/vehicle-organiser/assets/5466387/6d939263-9280-4c4b-9fc0-0429697b83ea)
   
4. Add Vehicle

   ![Add Vehicle](https://github.com/dspchathuranga/vehicle-organiser/assets/5466387/7a1977ed-2b10-44c0-a4b0-ac584e6b18aa)
   
5. Edit Vehicle
6. Remove Vehicle
7. Remove Added Equipment

   ![Home](https://github.com/dspchathuranga/vehicle-organiser/assets/5466387/fe4a6eb2-fbeb-40c0-b474-9d59a4174815)

## Contributing

If you would like to contribute to the project, please submit a pull request. We welcome your contributions and ideas.

---

© 2023 DSP Chathuranga

