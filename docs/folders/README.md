# Folder Structure

`options.root` is used to calculate the directory structure.

Tell MVC Express where the root of your directory tree is. Your minimal directory tree should look like this:

```
boot
http
    controllers
        basic
        resource
    routes.js (this can be a dir w an index.js too)
models
public    
resources
    views
services
index.js (this is in the root dir)
```

In the above the directory `index.js` is located in would be the root. Below is a more full example that can be used in
 conjunction with Sequelize as your ORM:

```
app
    boot
    http
        controllers
            basic
            resource
        routes.js
    models
    resources
        views
    services
    index.js
config
migrations
seeders
```

For the case above, the `app` directory would be considered the root.

## Resources

The resources directory is meant for things that are compiled. Most resources are compiled and served as static assets. So sass files, images that get opimized, and front end javascript that gets browserified or webpacked. In addition to these the templates can be though of as compiled.
