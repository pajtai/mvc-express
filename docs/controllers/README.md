# Controllers

Controllers are loaded from `http/controllers`. There are two types of controllers, and they are loaded separately.

Resource controllers are loaded from `http/controllers/resource`. Basic controllers are loaded from `http/controllers/basic`.

If you set `controller.default` to true, then `controller.index` will be used for the `/` - the home page.

## Resource Controllers

These are automatically routed based on their names. Routes are created for available actions:

| Verb   | Route                                                 | Method                |
|--------|-------------------------------------------------------|-----------------------|
| get    | `/${controller.name}/`                                | controller.index      |
| get    | `/${controller.name}/create`                          | controller.create     |
| post   | `/${controller.name}`                                 | controller.store      |
| get    | `/${controller.name}/:${controller.singularName}`     | controller.show       |
| get    | `/${controller.name}/:${controller.singularName}/edit`| controller.edit       |
| put    | `/${controller.name}/:${controller.singularName}`     | controller.update     |
| delete | `/${controller.name}/:${controller.singularName}`     | controller.destroy    |

## Basic Controllers

The can be attached to routes in routes.js.

Take a look at the "examples" directory.