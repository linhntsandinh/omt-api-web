"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notification = /** @class */ (function () {
    function notification(sender, receiver, des, path, status) {
        this.sender = sender;
        this.receiver = receiver;
        this.des = des;
        this.path = path;
        this.status = status;
    }
    return notification;
}());
exports.notification = notification;
exports.default = notification;
