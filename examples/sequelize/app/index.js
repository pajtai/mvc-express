'use strict';

const mvc = require('../../../index');
const config = require('../config/config.json');
const modelLoader = require('../../../models/sequelize')(config);


mvc.boot({
    root : __dirname,
    modelLoader
});
