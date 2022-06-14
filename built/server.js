"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_js_1 = require("./server/api.js");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_static_gzip_1 = __importDefault(require("express-static-gzip"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '/client/assets')));
app.use('/', (0, express_static_gzip_1.default)(path_1.default.join(__dirname, '/client/dist'), { enableBrotli: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (res) => {
    console.log('Serving index.html');
    res.end();
});
app.get('/multipleProducts', (req, res) => {
    console.log('Fetching', req.query.ids);
    api_js_1.Product.fetchMultiple(req.query.ids)
        .then(result => {
        console.log(JSON.stringify(result.data));
        res.json(result.data);
    })
        .catch(err => {
        res.sendStatus(500);
    })
        .then(() => {
        res.end();
    });
});
app.all('*', (req, res) => (api_js_1.Product.fwd(req, (err, result) => {
    console.log('API response:');
    if (err) {
        const error = (err.response ? err.response.data : err) + '\n';
        console.log(error);
        res.sendStatus(500);
    }
    else {
        if (Array.isArray(result)) {
            console.log(result.map(result => (JSON.stringify(result))));
            res.json(result);
        }
        else {
            console.log(result);
            res.send(result);
        }
    }
    res.end();
})));
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
