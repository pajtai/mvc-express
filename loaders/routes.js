'use strict';

module.exports = (options, dirTree, controllers, services) => {
    loadBasicControllers(options.app, dirTree, controllers, services);
    loadResourceControllers(options.app, controllers);
};

function loadResourceControllers(app, controllers) {
    for (let controllerKey of Object.keys(controllers)) {
        let controller = controllers[controllerKey];
        if (!controller.resource) {
            continue;
        }
        // Using ifs because ES6 class instance methods are a pain to iterate over - presving optin to use them
        if (controller.index) {
            if (controller.default) {
                console.log('registering home page - this should only be called once');
                app.get('/', controller.index.bind(controller));
            }
            app.get(`/${controller.name}/`, controller.index.bind(controller));
        }
        if (controller.create) {
            app.get(`/${controller.name}/create`, controller.create.bind(controller));
        }
        if (controller.store) {
            app.post(`/${controller.name}`, controller.store.bind(controller));
        }
        if (controller.show) {
            app.get(`/${controller.name}/:${controller.singularName}`, controller.show.bind(controller));
        }
        if (controller.edit) {
            app.get(`/${controller.name}/:${controller.singularName}/edit`, controller.edit.bind(controller));
        }
        if (controller.update) {
            app.put(`/${controller.name}/:${controller.singularName}`, controller.update.bind(controller));
        }
        if (controller.destroy) {
            app.delete(`/${controller.name}/:${controller.singularName}`, controller.destroy.bind(controller));
        }
    }
}

function loadBasicControllers(app, dirTree, controllers, services) {
    try {
        let routes = require(dirTree.routes)(controllers, app, services);
    } catch (e) {
        console.log('Loading routes failed');
        console.log(e);
    }
}
