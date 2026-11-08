"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.continueRender = exports.delayRender = void 0;
const get_environment_1 = require("./get-environment");
if (typeof window !== 'undefined') {
    window.ready = false;
}
let handles = [];
const timeouts = {};
const delayRender = () => {
    var _a, _b;
    const handle = Math.random();
    handles.push(handle);
    const called = (_b = (_a = Error().stack) === null || _a === void 0 ? void 0 : _a.replace(/^Error/g, '')) !== null && _b !== void 0 ? _b : '';
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
        timeouts[handle] = setTimeout(() => {
            throw new Error('A delayRender was called but not cleared after 25000ms. See https://remotion.dev/docs/timeout for help. The delayRender was called: ' +
                called);
        }, 25000);
    }
    if (typeof window !== 'undefined') {
        window.ready = false;
    }
    return handle;
};
exports.delayRender = delayRender;
const continueRender = (handle) => {
    handles = handles.filter((h) => {
        if (h === handle) {
            if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
                clearTimeout(timeouts[handle]);
            }
            return false;
        }
        return true;
    });
    if (handles.length === 0 && typeof window !== 'undefined') {
        window.ready = true;
    }
};
exports.continueRender = continueRender;
//# sourceMappingURL=ready-manager.js.map