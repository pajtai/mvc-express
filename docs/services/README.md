# Services

Service are loaded from the directory `services` in the root directory. To be loaded, the file must be named `*.service.js`.
An object based on the file structure of the
services dir is created. For example with this file structure:

```
app (root dir)
    services
        one
            two.service.js
        three.service.js
```

and these files:

```javascript
// two.service.js
module.exports = {
    a : 1
}
```

```javascript
// three.service.js
module.exports = {
    b : 1
}
```

`services` would be:

```javascript
{
    one : {
        two : {
            a : 1
        }
    },
    three : {
        b : 1
    }
}
```

Most service files would return functions.
