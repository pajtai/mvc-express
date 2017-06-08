# Options

| Option  | Default |
|---|---|
| express | `require('express)` from this npm |
| app | options.express() |
| PORT | 3000 |
| root | process.cwd() |
| viewEngine | 'pug' |
| modelLoader | `require(path.join(options.root, 'boot', 'models'))` |
| verbose | false |

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
