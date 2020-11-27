## Installation

Required. This section is typically just:

For installing node modules.
```sh
$ npm install
```
First create db in mysql with db name "category_level" after run migration command.

```sh
$ sequelize db:migrate
```

After that run command to populate data

```sh
sequelize db:seed --seed 20200611095029-create-lisitng.js
```

Run project

```sh
$ npm run start
```
