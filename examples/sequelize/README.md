# MVC-Express example using Sequelize

To run the app, create the DB, use [the Sequelize CLI](https://github.com/sequelize/cli) to
run the migrations and the seeds, then `npm run dev`.

```bash
mysql -uroot

create database mvc;
exit

sequelize db:migrate
sequelize db:seed:all

npm run dev
```