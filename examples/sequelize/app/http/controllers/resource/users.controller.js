'use strict';

class UsersController {
    index (req, res, next) {
        res.send(`Index for users`);
    }

    create (req, res) {
        res.send(`Create ${req.params.user}`);
    }

    show (req, res) {
        res.send(`This is the ${req.params.user} page.`);
    }

    edit (req, res) {
        res.send(`Edit ${req.params.user}`);
    }

    update(req, res) {
        res.send(`Update ${req.params.user}`);
    }

    delete(req, res) {
        res.send(`Delete ${req.params.user}`);
    }

}

module.exports = models => {
    return new UsersController();
};
