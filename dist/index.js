"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _config = _interopRequireDefault(require("../config"));

var _root = _interopRequireDefault(require("./routes/root"));

require("./controllers/bot");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();
app.use((0, _koaBody.default)());
app.use(_root.default.routes());
app.listen(_config.default.port ? _config.default.port : 8080);