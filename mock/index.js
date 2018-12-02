const global = require('./global');
const generatorModules = require('./generator/modules');
const generatorPages = require('./generator/pages');
const operateActivity = require('./operate/activity');

module.exports = Object.assign(
    {},
    global,
    generatorModules,
    generatorPages,
    operateActivity
);
