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

Model paths are generated from files in `app/models` that are named `*.model.js`. The model loader can of course choose
to use or ignore the array of paths. An example model loader is located [here](https://github.com/pajtai/mvc-express/blob/master/models/sequelize.js).

Model loader function example:
```js
function modelLoader(modelPaths, services, options) {
    const models = {};
    modelPaths.forEach(thePath => {
        //a file named TestModel.model.js will end up as models.TestModel 
        let modelName = thePath.split('/').pop().split('.').shift();
        const Model = require(thePath)(options.connection);
        models[modelName] = Model;
    });
    return models;
}
```
