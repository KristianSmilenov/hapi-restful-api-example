Sample API built using hapi v8.0
=================================

An example of a Restful API built using [hapi.js](http://hapijs.com/) v8.0  with Swagger integration and mysql database.

Install
-------

`$ git clone git@github.com:KristianSmilenov/hapi-restful-api-example.git`  
`$ cd hapi-restful-api-example`  
`$ npm install`

Database setup
--------------

* Download the 'net' database from NMS appliance and upload it locally to mysql server. (I can provide an sql dump of the databse if necessary)
* Set database configuration in /src/config/constants.js

Run
---

`$ npm index.js`

Using the API
-------------
* **GET** http://localhost:81/v1/devices
* **GET** http://localhost:81/v1/devices/{id}
* **GET**    http://localhost:81/v1/alerts
* **POST**   http://localhost:81/v1/alerts
* **PUT** 	 http://localhost:81/v1/alerts/{id}
* **DELETE** http://localhost:81/v1/alerts/{id}

Swagger documentation
-------------
Documentation of the API is available here: http://localhost:81/documentation Since the database has many records, the GET requests to /devices and /alerts are limited to 50 by default

TODO: Tests
-----

`$ npm test`

Editing the project
-------------------

The project was developed using Visual Studio 2015RC and [NodeJS Tools](https://nodejstools.codeplex.com/)

Additional information:

version: v8.6.1
routing: built in
routing validation: [Joi](https://github.com/hapijs/joi) Object schema description language and validator for JavaScript objects
swagger: [hapi-swagger ](https://github.com/glennjones/hapi-swagger) A Swagger interface for hapi
error handling: built in, [boom](https://github.com/hapijs/boom) Set of utilities for returning HTTP errors
mysql connection: [node-mysql](https://github.com/felixge/node-mysql/) Node.js driver for mysql
IDE + debugging: Visual studio + NodeJS Tools (NTVS supports Editing, Intellisense, Profiling, npm, TypeScript, Debugging locally and remotely (Windows/MacOS/Linux), as well Azure Web Sites and Cloud Service)

Debugging the project
-------------------

After installing [NodeJS Tools](https://nodejstools.codeplex.com/), open the HapiDaliProject.sln file and build and run the project from Visual Studio. Debugger is automatically started on port 5858.

`Debugger listening on port 5858
Server running at: http://localhost:81`

License
-------

MIT
