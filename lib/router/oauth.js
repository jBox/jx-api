const express = require("express");
const router = express.Router();
const { BadRequestError, UnauthorizedError } = require("../http-errors");

/* GET access_token */
// GET /oauth/token?secret=${secretCode}&code=${code}&grant_type=authorization_code
router.get("/token", (req, res, next) => {
    const { oauthService } = req.services;
    const { secret, code, grant_type } = req.query;
    if (grant_type === "authorization_code") {
        return oauthService.authorize(secret, code, grant_type).then((user) => {
            console.log("token", user);
            return oauthService.sign({ id: user.id }).then((token) => res.send(token));
        }).catch((error) => next(new UnauthorizedError(error.message)));
    }

    return next(new BadRequestError());
});

/* GET refresh token */
router.get("/refresh", (req, res, next) => {
    const { oauthService } = req.services;
    const { token } = req.query;
    if (token) {
        return oauthService.verify(token).then((id) => {
            return oauthService.sign({ id }).then((token) => res.send(token));
        }).catch((error) => next(new UnauthorizedError()));
    }

    return next(new BadRequestError());
});

module.exports = {
    baseUrl: "/oauth",
    router
};