# Controllers

Controllers are loaded from `http/controllers`. There are two types of controllers, and they are loaded separately.

Resource controllers are loaded from `http/controllers/resource`. Basic controllers are loaded from `http/controllers/basic`.

You have to name your controller files `*.controller.js`. Your controller file will be called with two arguments: `models` and
`services`.

If you set `controller.default` to true, then `controller.index` will be used for the `/` - the home page.

## Resource Controllers

These are automatically routed based on their names. Routes are created for available actions:

| Verb   | Route                                                 | Method                |
|--------|-------------------------------------------------------|-----------------------|
| get    | `/${controller.name}/`                                | controller.index      |
| get    | `/${controller.name}/create`                          | controller.create     |
| post   | `/${controller.name}`                                 | controller.store      |
| get    | `/${controller.name}/:id`                             | controller.show       |
| get    | `/${controller.name}/:id/edit`                        | controller.edit       |
| put    | `/${controller.name}/:id`                             | controller.update     |
| delete | `/${controller.name}/:id`                             | controller.destroy    |

In the action for the controllers with `:id`, the id is available as `req.params.id`.

## Basic Controllers

They can be attached to routes in routes.js. The actually middleware is on the action: `app.get('/something', controllers.myController.create)`

Take a look at the "examples" directory.

## Order

Resource controllers are loaded first. `routes.js` is called second. This is so a standard express 404 pages can be included
in routes.js using something like `app.get('*', controllers.notFound.index);`

If you need to add something before the resource controllers (e.g. auth on them), do it in `routes-init.js` or before you
pass app into boot.

## Examples

```javascript
// app/http/controllers/resource/pages.controller.js
'use strict';

class PagesController {

    constructor (models) {
        this.default = true;
        this.models = models;
    }

    index (req, res, next) {
        // Index will show what /home shows
        req.params.page = 'home';
        this.show(req, res, next);
    }

    show (req, res, next) {
        this.models.Pages.findOne({
            where: { slug: req.params.page }
        })
            .then(page => {
                res.send(page.title + ' : ' + page.content);
            })
            .catch(e => {
                console.log(404);
                next();
            });
    }
}

module.exports = models => {
    return new PagesController(models);
};
```

Note that `module.exports` is called with whatever you decide to. This is controlled in your model loader. Typically you
would pick models and services. [Here](https://github.com/pajtai/mvc-express/blob/master/models/sequelize.js) is a sample model loader, and [here](https://github.com/pajtai/mvc-express/blob/master/examples/sequelize/app/index.js#L5) is how you configure it for an app.