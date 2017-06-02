# Models

Models are loaded after [services](/mvc-express/services).

Models are loaded via that model loader passed into boot:

```javascript
const mvc = require('mvc-express');

mvc.boot({
    root : __dirname,
    modelLoader
});
```

The model loader is a function that is called with an array of the paths to all models and services.

Model paths are generate from files in `app/models` that are named `*.model.js`. The model loader can of course choose
to use or ignore the array of paths. An example model loader is located [here](https://github.com/pajtai/mvc-express/blob/master/models/sequelize.js).
