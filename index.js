'use strict';

const BB = require('bluebird');
const bodyParser = require('body-parser');
const glob = require('glob');
const loadControllers = require('./loaders/controllers');
const loadRoutes = require('./loaders/routes');
const namespace = require('namespace-generator');
const path = require('path');
const express = require('express');
const pug = require('pug');

exports.boot = boot;
exports.reset = reset;
exports.state = {
    booted: false
};
exports.getDirTree = getDirTree;

function boot(options) {

    options.listen = options.listen !== false;
    options.express = options.express || express;
    options.app = options.app || options.express();
    options.PORT = options.PORT || 3000;
    options.root = options.root || process.cwd();
    options.viewEngine = options.viewEngine || 'pug';
    const dirTree = getDirTree(options);

    // Loading services
    exports.services = namespace.sync(dirTree.services, '/**/*.service.js', '.service.js');
    // Boot process
    let bootFile = glob.sync(`${dirTree.boot}/startup.js`);
    let promise;

    if (bootFile.length) {
        bootFile = bootFile.pop();
        promise = require(bootFile)(exports.services, options);

        if (promise) {
            promise = promise.then(() => {
                exports.state.booted = true;
                return loadAfterBoot(options, dirTree);
            });
        } else {
            exports.state.booted = true;
            loadAfterBoot(options, dirTree);
        }

    } else {
        bootFile = null;
        promise = BB.resolve();
        exports.state.booted = true;
        loadAfterBoot(options, dirTree);
    }

    exports.promise = promise;
    return promise;
}

function loadAfterBoot(options, dirTree) {
    // Load models
    const modelPaths = glob.sync(`${dirTree.models}/**/*.model.js`);
    const modelLoader = options.modelLoader || require(path.join(dirTree.boot, 'models'));
    exports.models = modelLoader(modelPaths, exports.services, options);
    exports.controllers = loadControllers(exports.models, dirTree, exports.services, options);

    if (!options.listen) {
        return;
    }

    options.verbose && exports.services && (console.log('\n\nServices available:'), Object.keys(exports.services).forEach(service => console.log(`    ${service}`)));
    options.verbose && exports.models && (console.log('\n\nModels available:'), Object.keys(exports.models).forEach(model => console.log(`    ${model}`)));
    options.verbose && exports.controllers && (console.log('\n\nControllers available:'), Object.keys(exports.controllers).forEach(controller => console.log(`    ${controller}`)));

    // Start node app
    options.app.set('view engine', options.viewEngine);
    options.app.set('views', dirTree.views);

    // TODO: this should be in the docs and optional
    // parse application/x-www-form-urlencoded
    options.app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    options.app.use(bodyParser.json());

    loadRoutes(options, dirTree, exports.controllers, exports.services);

    exports.server = options.app.listen(options.PORT);
    console.log(`Express started on port ${options.PORT}`);
}

function reset() {
    exports.server && exports.server.close();
    exports.controllers = null;
    exports.models = null;
    exports.server = null;
    exports.promise = null;
    exports.services = null;
    exports.state = {
        booted : false
    };
}

function getDirTree(options) {
    const root = options.root;
    return {
        root,
        boot : path.join(root, 'boot'),
        controllers : path.join(root, 'http', 'controllers'),
        controllersBasic : path.join(root, 'http', 'controllers', 'basic'),
        controllersResource : path.join(root, 'http', 'controllers', 'resource'),
        models : path.join(root, 'models'),
        routes : path.join(root, 'http', 'routes'),
        routesInit : path.join(root, 'http', 'routes-init'),
        services : path.join(root, 'services'),
        views : path.join(root, 'resources', 'views')
    }
}
