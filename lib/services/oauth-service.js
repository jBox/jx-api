const request = require("request");
const jwt = require("jsonwebtoken");

const refresh = {
    token(secret, data) {
        return new Promise((resolve, reject) => {
            // sign with default (HMAC SHA256)
            // sign asynchronously
            jwt.sign(data, secret, { algorithm: "HS256", expiresIn: "30d" }, (err, token) => {
                if (err) {
                    return reject(err);
                }

                return resolve(token);
            });
        });
    }
};

class OAuthService {
    constructor(secret, refreshSecret) {
        const port = process.env.JX_SERVICE_PORT;
        this.localServiceHost = `http://localhost:${port}`;
        this.secret = secret;
        this.refreshSecret = refreshSecret;
    }

    authorize(secret, code, type) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "POST",
                baseUrl: this.localServiceHost,
                headers: [{ "content-type": "application/json" }],
                url: "/oauth/authorize",
                body: { secret, code, type },
                json: true
            };

            request(options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                return resolve(body);
            });
        });
    }

    sign(data) {
        const secret = this.secret;
        const refreshSecret = this.refreshSecret;
        return new Promise((resolve, reject) => {
            // sign with default (HMAC SHA256)
            // sign asynchronously
            jwt.sign(data, secret, { algorithm: "HS256", expiresIn: "2h" }, (err, token) => {
                if (err) {
                    return reject(err);
                }

                return refresh.token(refreshSecret, data).then((refreshToken) => resolve({
                    access_token: token,
                    token_type: "bearer",
                    expires_in: 7200,
                    refresh_token: refreshToken
                }));
            });
        });
    }

    verify(token) {
        const secret = this.refreshSecret;
        return new Promise((resolve, reject) => {
            // verify a token symmetric
            jwt.verify(token, secret, { algorithm: "HS256" }, (err, decoded) => {
                if (err) {
                    return reject(err);
                }

                return resolve(decoded.id);
            });
        });
    }
}

module.exports = OAuthService;