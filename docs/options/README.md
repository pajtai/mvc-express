# Options

| Option  | Default |
|---|---|
| express | `require('express)` from this npm |
| app | options.express() |
| PORT | 3000 |
| root | process.cwd() |
| viewEngine | 'pug' |
| modelLoader | `require(path.join(options.root, 'boot', 'models'))` |

The [directory structure](/mvc-express/folders) is calculated from `options.root`.
