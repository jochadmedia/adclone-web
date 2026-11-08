"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentFrame = exports.useAbsoluteCurrentFrame = void 0;
const react_1 = require("react");
const sequencing_1 = require("./sequencing");
const timeline_position_state_1 = require("./timeline-position-state");
const useAbsoluteCurrentFrame = () => {
    const timelinePosition = (0, timeline_position_state_1.useTimelinePosition)();
    return timelinePosition;
};
exports.useAbsoluteCurrentFrame = useAbsoluteCurrentFrame;
const useCurrentFrame = () => {
    const frame = (0, exports.useAbsoluteCurrentFrame)();
    const context = (0, react_1.useContext)(sequencing_1.SequenceContext);
    const contextOffset = context
        ? context.cumulatedFrom + context.relativeFrom
        : 0;
    return frame - contextOffset;
};
exports.useCurrentFrame = useCurrentFrame;
//# sourceMappingURL=use-frame.js.map