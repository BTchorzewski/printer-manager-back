# the printer manager

## Description

The application is designed to help employees to deal with the company's printing service and maintain the local
warehouse.

# Version 1.0.0

## user stories

[x] As a user, I can see a list of printers on my contract.
[x] As a user, I can add a new printer.
[x] As a user, I can update printer information.
[x] As a user, I can remove a device.
[x] As a user, I can see the inventory.
[x] As a user, I can add new supplies to the stock.
[x] As a user, I can add material to the printer.
[x] As a user, I can see the history of the listed materials in the printer.
[x] As a user, I want to see the number of printers on contract.
[x] As a user, I want to receive a message about shortages in the warehouse.

### elements that will be added as soon as possible.
- validation
- tests
- authentication by JWT tokens.
## Backend Tech

The printer manager uses a number of open source projects to work properly:

- [node.js] - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express] - fast node.js network app framework.
- [Typeorm] - TypeORM is an ORM that can run in NodeJS, can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- [cors] - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with
  various options.
- [mysql2] - MySQL client for Node.js with focus on performance.
- [jest] - Delightful JavaScript Testing.
- [supertest] -SuperAgent driven library for testing HTTP servers
- [Typescript] - TypeScript is a strongly typed programming language that builds on JavaScript.

## Installation

Warning! a database from 

The printer manager requires [Node.js](https://nodejs.org/) 16+ to run.

1. Import the database that is attached to repository in requirements directory.
2. Use the config.example.ts from the config directory to create a config file. Leave corsOrigin undefined.
```shell
export const config = { 
  corsOrigin: undefined, 
  appPort: 3001, 
  db: { 
    host: 'localhost', 
    port: 3306, 
    username: 'username', 
    password: 'password', 
    database: 'printer-manager', 
     } 
  };
```
4. Install the dependencies and devDependencies and start the server.

```sh
cd printer-manager-back
npm i
npm run start:dev
```

## Live demo: coming soon.

## Frontend tech
- [React.js] - A JavaScript library for building user interfaces.
- [sass] - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
- [React-router] -Closing in on a decade of client-side routing.
- [Typescript] - TypeScript is a strongly typed programming language that builds on JavaScript.

# Version 2.0.0
More information soon

