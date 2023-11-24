# Simple NestJS Server

## Description

Just a NestJS web server connected to a PostgreSQL database. The web server provides a JSON REST API for accessing the database.

The database contains the `products` table. The product model contains the fields:

- Name
- Price
- Remaining quantity in stock

Methods implemented:

- Display the entire list of products (with pagination)
- Output of one element
- Adding a product
- Editing a product
- Removing a product

The web server is deployed using docker-compose.

Technologies used:
- TypeScript
- NestJS (NodeJS framework)
- TypeORM (ORM: Object Relational Mapper)
- Postgres (relational database)
- REST API
- Docker (for containerization)
- Docker Compose

## Requirements

- Docker installed and running

## How to use

1. Clone the repo `git clone https://github.com/temiksvyatov/vvdev-nest-server.git`
2. Move to the project folder `cd vvdev-rest-server`
3. run command `docker compose up --build`
4. Go to your browser and visit adress `http://localhost:3000`

### TODO

- [ ] You can implement uploading product photos to the server - you can store them in the project directory itself in a separate folder, adding a separate method for uploading photos as `multipart/form-data`.
Photos should be deleted if products with it no longer exist.
- [ ] Add a linter check via GitHub Actions
