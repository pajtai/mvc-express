'use strict';

class PagesController {

    constructor (models) {
        this.default = true;
        this.models = models;
    }

    index (req, res, next) {
        // Index will show what /home shows
        req.params.page = 'home';
        this.show(req, res, next);
    }

    // HTML for a new page
    create (req, res) {
        res.render('pages/pages.create.view.pug');
    }

    // API for a new page
    store (req, res) {
        this.models.Pages.create(req.body)
            .then(() => {
                res.redirect(`/pages/${req.body.slug}`);
            })
            .catch(e => {
                res.send(e);
            });
    }


    show (req, res, next) {
        this.models.Pages.findOne({
            where: { slug: req.params.page }
        })
            .then(page => {
                res.send(page.title + ' : ' + page.content);
            })
            .catch(e => {
                console.log(404);
                next();
            });
    }

    edit (req, res) {
        res.send(`Edit ${req.params.page}`);
    }

    update(req, res) {
        res.send(`Update ${req.params.page}`);
    }

    delete(req, res) {
        res.send(`Delete ${req.params.page}`);
    }
}

module.exports = models => {
    return new PagesController(models);
};
