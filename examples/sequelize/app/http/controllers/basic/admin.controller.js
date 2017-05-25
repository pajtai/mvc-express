'use strict';

class AdminController {
    constructor (models) {
        this.models = models;
    }

    index(req, res) {
        res.send('admin index!');
    }

    create(req, res) {
        console.log('type', req.params.type, !!this.models[req.params.type]);
        res.send('ok');
    }
}

module.exports = models => {
    return new AdminController(models);
};
