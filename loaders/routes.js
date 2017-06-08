'use strict';

module.exports = (options, dirTree, controllers, services) => {
    loadRoutesInit(options.app, dirTree, controllers, services, options);
    loadResourceControllers(options.app, controllers);
    loadBasicControllers(options.app, dirTree, controllers, services, options);
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
            app.get(`/${controller.name}/:id`, controller.show.bind(controller));
        }
        if (controller.edit) {
            app.get(`/${controller.name}/:id/edit`, controller.edit.bind(controller));
        }
        if (controller.update) {
            app.put(`/${controller.name}/:id`, controller.update.bind(controller));
        }
        if (controller.destroy) {
            app.delete(`/${controller.name}/:id`, controller.destroy.bind(controller));
        }
    }
}

function loadRoutesInit(app, dirTree, controllers, services, options) {
    try {
       require(dirTree.routesInit)(controllers, app, services, options);
    } catch (e) {
        console.log('Loading routes-init failed');
    }
}

function loadBasicControllers(app, dirTree, controllers, services, options) {
    try {
        require(dirTree.routes)(controllers, app, services, options);
    } catch (e) {
        console.log('Loading routes failed');
    }
}
