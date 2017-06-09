# Options

| Option  | Default | Description |
|---|---|---|
| express | `require('express)` from this npm | |
| app | options.express() | |
| PORT | 3000 | Port to listen on |
| root | process.cwd() | Root directory for the folder structure |
| viewEngine | 'pug' | |
| modelLoader | `require(path.join(options.root, 'boot', 'models'))` | Function to be used to load all models |
| verbose | false | |
| listen | true | If `false` the express app will not be started, but models, controllers, and services will be loaded |

The [directory structure](/mvc-express/folders) is calculated from `options.root`.

This object is passed the the controllers, models, and routes. It can be loaded with whatever you want in the boot function. 
For example:

```js
// boot function @ <docroot>/boot/startup.js


module.exports = (services, options) => {
    // these will be available in your controllers, routes, and models via the options param
    options.thing1 = 'val1';
    options.thing2 = 'val2';
};
```
