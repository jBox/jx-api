const cv = require("config-vars");
const Path = require("path");
const fs = require("fs-extra");

module.exports = (req, res, next) => {
    const pathname = req.path;
    const [, txt] = Array.from(/\/(\w+.txt)$/ig.exec(pathname) || []);
    if (txt) {
        const filePath = Path.resolve(cv.env.shareFolder, `./${txt}`);
        return fs.stat(filePath).then((stats) => {
            if (stats.isFile()) {
                return res.sendFile(filePath);
            } else {
                return next();
            }
        }).catch(() => next());
    }

    return next();
};