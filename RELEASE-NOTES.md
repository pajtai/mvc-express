# Release Notes

## 1.1.0
_2017-06-09_

Setting `options.listen` to `false` will not start the express app. Models, controllers, and services will still be loaded.
They are available at `require('mvc-express).models`, `.controllers`, and `.services`.

## 1.0.0
_2017-06-09_

The built in Sequelize model loader is now its own npm. This is so that the dependencies of the loaders do not have to
be included as dependencies of `mvc-express`. This is a backward incompatible change if you were using the built in
Sequelize model loader

## 0.2.0
_2017-06-08_

The options object is now passed into models, controllers, routes, and routes-init.

## 0.1.0
_2017-06-05_

In resource controllers, the id of the object is now `req.params.id`.

## 0.0.2
_2017-06-04_

## 0.0.1
_2017-06-03_

## 0.0.0
_2017-05-25_