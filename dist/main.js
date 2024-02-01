"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
// class Interceptor { }
class someCLass {
    serv2;
    prop = 0;
    constructor(serv2) {
        this.serv2 = serv2;
        this.serv2;
        this.prop;
    }
    // @Log()
    handleErrors(...arg) {
        // error; event;
        arg;
        console.log('running handle Errors');
        return 1;
    }
    handleException(exception, eventName) {
        if (exception instanceof Error) {
        }
        else {
            // console.log('not an error')
        }
        eventName;
        exception;
        console.log({ eventName, exception });
        // process.exit(1)
    }
}
__decorate([
    (0, decorator_1.Log)('method constructor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], someCLass.prototype, "handleErrors", null);
const instance = new someCLass(7);
const instance2 = new someCLass(7);
instance2.handleErrors('asd', true, 34, 'uga chacka');
instance.handleErrors('asd', 'pachanga');
//# sourceMappingURL=main.js.map