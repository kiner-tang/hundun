"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var env_development_1 = require("./env.development");
var env_testing_1 = require("./env.testing");
var env_production_1 = require("./env.production");
exports.config = ({
    development: env_development_1.config,
    testing: env_testing_1.config,
    production: env_production_1.config,
})[process.env.BUILD_ENV];
