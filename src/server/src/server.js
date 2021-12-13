"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(cors_1.default);
app.use(body_parser_1.default.json());
app.post('/login', function (req, res) {
    var code = req.body.code;
    var spotifyApi = new spotify_web_api_node_1.default({
        redirectUri: 'http://localhost:3000/',
        clientId: 'ea7ec046e46f4faea91091b10e65d993',
        clientSecret: '86eff131454149dab4428afca96ca52c',
    });
    spotifyApi
        .authorizationCodeGrant(code)
        .then(function (data) {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        });
    })
        .catch(function (err) {
        res.sendStatus(400);
    });
});
app.listen(3001);
