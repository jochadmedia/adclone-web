"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureSpring = exports.spring = void 0;
const spring_utils_1 = require("./spring-utils");
function spring({ frame, fps, config = {}, from = 0, to = 1, }) {
    const spr = (0, spring_utils_1.springCalculation)({
        fps,
        frame,
        config,
        from,
        to,
    });
    if (!config.overshootClamping) {
        return spr.current;
    }
    if (to >= from) {
        return Math.min(spr.current, to);
    }
    return Math.max(spr.current, to);
}
exports.spring = spring;
var measure_spring_1 = require("./measure-spring");
Object.defineProperty(exports, "measureSpring", { enumerable: true, get: function () { return measure_spring_1.measureSpring; } });
//# sourceMappingURL=index.js.map