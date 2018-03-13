const Path = require("path");
const fs = require("fs-extra");
const router = require("./router");

module.exports = ({ root, logger, secret, refreshSecret }) => {
    const DATA_DIR = Path.resolve(root, "./data");
    fs.ensureDirSync(DATA_DIR);

    return router(DATA_DIR, logger, secret, refreshSecret);
};