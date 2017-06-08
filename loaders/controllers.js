'use strict';

const glob = require('glob');
const path = require('path');

module.exports = (models, dirTree, services, options) => {
    let controllers = {};

    glob.sync(`${dirTree.controllersResource}/**/*.controller.js`).forEach(controllerFilePath => {
        let controller = createController(controllerFilePath, models, services, options);
        // Flag this as a resource controller
        controller.resource = true;
        controllers[controller.name] = controller;
    });

    glob.sync(`${dirTree.controllersBasic}/**/*.controller.js`).forEach(controllerFilePath => {
        let controller = createController(controllerFilePath, models, services, options);
        controllers[controller.name] = controller;
    });
    return controllers;
};

function createController(controllerFilePath, models, services, options) {
    let controller = require(path.resolve(controllerFilePath))(models, services, options);
    // You can optionally override the automatic name given via the file
    controller.name = controller.name || path.basename(controllerFilePath, '.controller.js');
    controller.singularName = controller.singularName || controller.name.replace(/s$/, '');
    return controller;
}