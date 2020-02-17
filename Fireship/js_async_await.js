"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
console.log('sync 1');
setTimeout(function (_) { return console.log('timeout 2'); }, 0);
Promise.resolve().then(function (_) { return console.log('promise'); });
console.log('sync 4');
var promise1 = node_fetch_1.default('https://jsonplaceholder.typicode.com/todos/1');
promise1
    .then(function (res) { return res.json(); })
    // .then(user => {
    //     throw new Error('uh oh');
    //     return user;
    // })
    .then(function (user) { return console.log("User: " + user.title); })
    .catch(function (err) { return console.log("Error: " + err); });
var tick = Date.now();
var log = function (v) { return console.log(v + " \n Elapsed: " + (Date.now() - tick)); };
var codeBlocker = function () {
    var i = 0;
    while (i < 1000000000) {
        i++;
    }
    return 'Billion loop';
};
var codeBlocker2 = function () {
    return new Promise(function (resolve, reject) {
        var i = 0;
        while (i < 1000000000) {
            i++;
        }
        resolve('Billion promise');
    });
};
var codeBlocker3 = function () {
    return Promise.resolve().then(function (v) {
        var i = 0;
        while (i < 1000000000) {
            i++;
        }
        return 'Billion loop done';
    });
};
log('Sync 1');
log(codeBlocker());
log('Sync 2');
codeBlocker2().then(log);
log('Sync 3');
codeBlocker3().then(log);
log('Sync 4');
var getFruit = function (name) { return __awaiter(_this, void 0, void 0, function () {
    var fruits;
    return __generator(this, function (_a) {
        fruits = {
            pina: 'p',
            durazno: 'd',
            fresa: 'f'
        };
        return [2 /*return*/, Promise.resolve(fruits[name])];
    });
}); };
getFruit('fresa').then(console.log);
var makeSmoothie = function () { return __awaiter(_this, void 0, void 0, function () {
    var a, b;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFruit('pina')];
            case 1:
                a = _a.sent();
                return [4 /*yield*/, getFruit('durazno')];
            case 2:
                b = _a.sent();
                return [2 /*return*/, [a, b]];
        }
    });
}); };
makeSmoothie().then(console.log);
var makeNoSmoothie = function () {
    var a;
    return getFruit('pina')
        .then(function (v) {
        a = v;
        return getFruit('durazno');
    })
        .then(function (v) { return a + v; });
};
makeNoSmoothie().then(console.log);
var makeSmoothie2 = function () { return __awaiter(_this, void 0, void 0, function () {
    var a, b, smoothie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                a = getFruit('pina');
                b = getFruit('durazno');
                return [4 /*yield*/, Promise.all([a, b])];
            case 1:
                smoothie = _a.sent();
                return [2 /*return*/, smoothie];
        }
    });
}); };
makeSmoothie2().then(log);
var gFruits = ['pina', 'durazno', 'fresa'];
var gSmoothie = gFruits.map(function (v) { return __awaiter(_this, void 0, void 0, function () {
    var e;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFruit(v)];
            case 1:
                e = _a.sent();
                log(e);
                return [2 /*return*/, (e)];
        }
    });
}); });
var gSmoothie2 = gFruits.map(function (v) { return getFruit(v); });
var fruitLoop = function () { return __awaiter(_this, void 0, void 0, function () {
    var e_1, _a, gSmoothie2_1, gSmoothie2_1_1, e, e_1_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 11]);
                gSmoothie2_1 = __asyncValues(gSmoothie2);
                _b.label = 1;
            case 1: return [4 /*yield*/, gSmoothie2_1.next()];
            case 2:
                if (!(gSmoothie2_1_1 = _b.sent(), !gSmoothie2_1_1.done)) return [3 /*break*/, 4];
                e = gSmoothie2_1_1.value;
                log(e);
                _b.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 11];
            case 5:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 6:
                _b.trys.push([6, , 9, 10]);
                if (!(gSmoothie2_1_1 && !gSmoothie2_1_1.done && (_a = gSmoothie2_1.return))) return [3 /*break*/, 8];
                return [4 /*yield*/, _a.call(gSmoothie2_1)];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 10: return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
