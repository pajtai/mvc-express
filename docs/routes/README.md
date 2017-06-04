# Routes

The routes file is required from `http/routes`. It is called with `controllers`, `app`, and `services`. You can use
this file to attach Basic Controllers to routes, or you can modify `app` in other ways.

## Middlewares

It is important to understand that mvc-express is just a wrapper around express, so it is possible to use middlewares with
it. You can write your own or use existing npms like passport.

Since the order that middlewares and routers are added to an express app is important, let's go over the order things get loaded.

1. Since, express and app can be passe into `mvc.boot`, the first place to add middlewares to app is before passing it into boot.
1. The next place to modify app is in `http/routes.js`. `routes.js` is called with controllers, app, and services. It is called
before the resource controllers are loaded, so you can add middlewares to the routes that will be created for those.
