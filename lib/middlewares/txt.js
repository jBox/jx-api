const cv = require("config-vars");
const Path = require("path");
const fs = require("fs");

module.exports = (req, res, next) => {
    const pathname = req.path;
    const [, txt] = Array.from(/\/(\w+.txt)$/ig.exec(pathname) || []);
    if (txt) {
        const filePath = Path.resolve(cv.env.shareFolder, `./${txt}`);
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
    }

    return next();
};