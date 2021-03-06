const express = require("express");
const errorHandler = require("../handlers/error-handler");
const { NotFoundError } = require("../http-errors");
const services = require("../services");

const oauth = require("./oauth");

module.exports = (dataDir, logger) => {
    const router = express.Router();

    // services middlewares
    router.use(services(dataDir));

    const routes = [oauth];
    for (let route of routes) {
        router.use(route.baseUrl, route.router);
    }

    // 404
    router.use((req, res, next) => next(new NotFoundError()));

    // services middlewares
    router.use(errorHandler(logger));

    return router;
};
