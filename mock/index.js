const global = require('./global');
const generatorModule = require('./generator/module');
const generatorPages = require('./generator/pages');
const operateActivity = require('./operate/activity');

module.exports = Object.assign(
    {},
    global,
    generatorModule,
    generatorPages,
    operateActivity
);
