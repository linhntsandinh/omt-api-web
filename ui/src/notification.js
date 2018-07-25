"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notification = /** @class */ (function () {
    function notification(sender, receiver, des, path) {
        this.sender = sender;
        this.receiver = receiver;
        this.des = des;
        this.path = path;
    }
    return notification;
}());
exports.notification = notification;
exports.default = notification;
