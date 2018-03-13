// include dependencies
const proxy = require("http-proxy-middleware");

// proxy middleware options
const targetPort = process.env.JX_SERVICE_PORT;
const options = {
    target: `http://localhost:${targetPort}`, // target host
    changeOrigin: true,               // needed for virtual hosted sites
    pathRewrite: {
        "^/api/orders": "/orders"
    },
    logLevel: "debug"
};

const filter = (pathname, req) => {
    return pathname.match("^/api/orders");
};

// create the proxy (with filter)
module.exports = proxy(filter, options);