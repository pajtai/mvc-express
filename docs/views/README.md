# Views

You can use any view engine that works with express. The default is `pug`. The view directory is at 
`resources/views`.

Here is an example of rendering a view in a controller:

```javascript
'use strict';

class Pages {
    contructor(models) {
        this.models = models;
    }
    
    index(req, res) {
        this.models.Pages.findOne({ where : { slug : req.params.page }})
            .then(page => {
                res.render('pages', { page });
            })
    }
}

module.exports = models => {
    return new Pages(models);
}
```