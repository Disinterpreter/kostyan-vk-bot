"use strict";

var _eventEmitter = _interopRequireDefault(require("./eventEmitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventEmitter.default.on('message_new', data => {
  console.log(data);
});