# mvc-express

MVC Express is a minimal MVC framework. It gives you:

1. Auto loading of Models you create
1. Auto loading of Resource Controllers - Controllers with CRUD on Controller name based routes
1. Auto loading of Basic Controllers - Controllers that can be attached to routes
1. Routes.js file
1. Unhindered ability to use express views, middlewares, and other functionality

## Usage

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

mvc.boot({
    root: __dirname
});
```

If `root` is not provided, the default is `process.cwd()`.

### Boot

After calling boot these are the things that happen:

1. Services are loaded from root/services. An object is created out of the services based on the services dir structure.
2. The boot file is called - if present - at root/boot/startup. If a promise is returned
from it, then MVC Express waits until the promise is resolved. If you need to connect to a DB, etc, this is the place to 
do it.
3. The models are loaded from root/model using root/boot/models. Models should be name NAME.model.js. The model loader is
called with the array of model paths found. This npm comes with a Sequelize loader at `require('mvc-express/models/sequelize')`.

