# Boot

Boot is the startup process. It is minimally started as follows:

```javascript
'use strict';

require('mvc-express').boot();
```

Boot takes an optional [options object](/mvc-express/options).

After calling boot these are the things that happen:

1. Services are loaded from root/services. An object is created out of the services based on the services dir structure.
2. The boot file is called - if present - at root/boot/startup. If a promise is returned
from it, then MVC Express waits until the promise is resolved. If you need to connect to a DB, etc, 
this is the place to do it. This is also a good place to attach anything you need to pass on to your models or
controllers to the 'options' object that gets passed in as the first parameter to the boot function.
3. The models are loaded from root/model using root/boot/models. Models should be name NAME.model.js. The model loader is
called with the array of model paths found. This npm comes with a Sequelize loader at `require('mvc-express/models/sequelize')`.
4. root/http/routes-init.js is loaded in. This is called with controllers, app, services.
5. Resource controllers are loaded from root/http/controllers/resource.  Resource controllers get a route based on their name, and the get CRUD automatically generated based on their actions.
6. Basic controller are loaded from root/http/controllers/basic. Basic controllers have to be hooked up to routes manually. Each controllers is called with models and services as arguments.
7. root/http/route.js is loaded in. This is called with controllers, app, services

