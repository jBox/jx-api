const OAuthService = require("./oauth-service");

module.exports = (dataDir, secret, refreshSecret) => {
    const services = {
        DATA_DIR: dataDir,
        oauthService: new OAuthService(secret, refreshSecret)
    };

    return (req, res, next) => {
        req.services = services;
        next();
    };
};