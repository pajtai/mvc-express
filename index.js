'use strict';

const BB = require('bluebird');
const glob = require('glob');
const namespace = require('namespace-generator');
const path = require('path');

exports.boot = boot;
exports.reset = reset;
exports.state = {
    booted: false
};
exports.getDirTree = getDirTree;

function boot(options) {

    options.roots = options.root || process.cwd();
    const dirTree = getDirTree(options);

    // Loading services
    exports.services = namespace.sync(dirTree.services, '/**/*.service.js', '.service.js');;

    // Boot process
    let bootFile = glob.sync(`${dirTree.boot}/startup.js`);
    let promise;
    if (bootFile.length) {
        bootFile = bootFile.pop();
        promise = require(bootFile)();
        promise.then(() => {
            exports.state.booted = true;
        });
    } else {
        bootFile = null;
        promise = BB.resolve();
        exports.state.booted = true;
    }
    exports.promise = promise;

    // Load models
    const modelPaths = glob.sync(`${dirTree.models}/**/*.model.js`);
    const modelLoader = options.modelLoader || require(path.join(dirTree.boot, 'models'));
    exports.models = modelLoader(modelPaths);

    return promise;
}

function reset() {
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
        services : path.join(root, 'services'),
    }
}
