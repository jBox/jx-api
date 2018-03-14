const cv = require("config-vars");

module.exports = cv.setup((getenv) => ({
    port: getenv("JX_API_PORT"),
    shareFolder: getenv("JX_API_SHARE_FOLDER"),
    jx: {
        certPath: getenv("JX_RSA_CERT_PATH"),
        servicePort: getenv("JX_SERVICE_PORT")
    },
    wx: {
        appid: getenv("JX_WX_APP_ID"),
        secret: getenv("JX_WX_APP_SECRET")
    }
}));