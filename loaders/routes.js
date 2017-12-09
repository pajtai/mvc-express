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
                app.get('/', getResourceControllerMiddlewares(controller, 'index'));
            }
            app.get(`/${controller.name}/`, getResourceControllerMiddlewares(controller, 'index'));
        }
        if (controller.create) {
            app.get(`/${controller.name}/create`, getResourceControllerMiddlewares(controller, 'create'));
        }
        if (controller.store) {
            app.post(`/${controller.name}`, getResourceControllerMiddlewares(controller, 'store'));
        }
        if (controller.show) {
            app.get(`/${controller.name}/:id`, getResourceControllerMiddlewares(controller, 'show'));
        }
        if (controller.edit) {
            app.get(`/${controller.name}/:id/edit`, getResourceControllerMiddlewares(controller, 'edit'));
        }
        if (controller.update) {
            app.put(`/${controller.name}/:id`, getResourceControllerMiddlewares(controller, 'update'));
        }
        if (controller.destroy) {
            app.delete(`/${controller.name}/:id`, getResourceControllerMiddlewares(controller, 'destroy'));
        }
    }
}

function getResourceControllerMiddlewares(controller, method) {
    let middlewares = [];
    if (controller[method + 'Middleware']) {
        middlewares = [controller[method + 'Middleware']()];
    }
    return [...middlewares, controller[method].bind(controller)]
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
