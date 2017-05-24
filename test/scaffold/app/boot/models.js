'use strict';

module.exports = modelPaths => {
    return modelPaths.reduce((current, modelPath) => {
        let model = require(modelPath)();
        current[model.name] = model;
        return current;
    }, {});
};
