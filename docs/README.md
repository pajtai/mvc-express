# mvc-express

[![Build Status](https://travis-ci.org/pajtai/mvc-express.png?branch=master)](https://travis-ci.org/pajtai/mvc-express)



MVC Express is a minimal MVC framework. It gives you:

1. Auto loading of Models you create
1. Optional Sequelize model loader 
1. Auto loading of Resource Controllers - Controllers with CRUD on Controller name based routes
1. Auto loading of Basic Controllers - Controllers that can be attached to routes
1. Routes.js file to hook Basic Controllers to routes
1. Unhindered ability to use express views, middlewares, and other functionality

## Usage

To start the app:

```javascript
'use strict';
// app/index.js

const mvc = require('mvc-express');
const config = require('../config/config.json');
const modelLoader = require('mvc-express/models/sequelize')(config);


mvc.boot({
    root : __dirname,
    modelLoader
});

```

Tell MVC Express where the root of your directory tree is. Your minimal directory tree should look like this:

```
boot
http
    controllers
        basic
        resource
    routes.js (this can be a dir w an index.js too)
models
public    
resources
    views
services
index.js
```

In the above the directory `index.js` is located in would be the root. Below is a more full example that can be used in
 conjunction with Sequelize as your ORM:

```
app
    boot
    http
        controllers
            basic
            resource
        routes.js
    models
    resources
        views
    services
    index.js
config
migrations
seeders
```

For the case above, the `app` directory would be considered the root.

To start the app:

```javascript
'use strict';
// app/index.js

const mvc = require('mvc-express');
const config = require('../config/config.json');
const modelLoader = require('mvc-express/models/sequelize')(config);


mvc.boot({
    root : __dirname,
    modelLoader
});

```

If `root` is not provided, the default is `process.cwd()`.

If `modelLoader` is not provided, then it is required in from `root/boot/models`.

### Boot

After calling boot these are the things that happen:

1. Services are loaded from root/services. An object is created out of the services based on the services dir structure.
2. The boot file is called - if present - at root/boot/startup. If a promise is returned
from it, then MVC Express waits until the promise is resolved. If you need to connect to a DB, etc, this is the place to 
do it.
3. The models are loaded from root/model using root/boot/models. Models should be name NAME.model.js. The model loader is
called with the array of model paths found. This npm comes with a Sequelize loader at `require('mvc-express/models/sequelize')`.
4. The controllers are loaded from root/http/controllers/basic and root/http/controllers/resource. Resource controllers
get a route based on their name, and the get CRUD automatically generated based on their actions. Basic controllers have
to be hooked up to routes manually. Each controllers is called with models and services as arguments.
5. root/http/route.js is loaded in. This is called with controllers, app, services

## Controllers

If you set `controller.default` to true, then `controller.index` will be used for the `/` - the home page.

### Resource Controllers

These are automatically routed based on their names. Routes are created for available actions:

```
+--------+-------------------------------------------------------+-----------------------+
| Verb   | Route                                                 | Method                |
+--------+-------------------------------------------------------+-----------------------+
| get    | `/${controller.name}/`                                | controller.index      |
| get    | `/${controller.name}/create`                          | controller.create     |
| post   | `/${controller.name}`                                 | controller.store      |
| get    | `/${controller.name}/:${controller.singularName}`     | controller.show       |
| get    | `/${controller.name}/:${controller.singularName}/edit`| controller.edit       |
| put    | `/${controller.name}/:${controller.singularName}`     | controller.update     |
| delete | `/${controller.name}/:${controller.singularName}`     | controller.destroy    |
+--------+-------------------------------------------------------+-----------------------+
```

### Basic Controllers

The can be attached to routes in routes.js.

Take a look at the "examples" directory.