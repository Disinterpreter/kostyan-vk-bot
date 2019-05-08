"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _eventEmitter = _interopRequireDefault(require("../controllers/eventEmitter"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.get(_config.default.root ? _config.default.root : '/', (ctx, next) => {
  switch (ctx.request.query.type) {
    case 'confirmation':
      ctx.body = _config.default.confirmation;
      break;

    default:
      ctx.body = 'ok';
      break;
  }

  _eventEmitter.default.emit(ctx.request.query.type, ctx.request.query);
});
var _default = router;
exports.default = _default;