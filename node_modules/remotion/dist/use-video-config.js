"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVideoConfig = void 0;
const use_unsafe_video_config_1 = require("./use-unsafe-video-config");
const useVideoConfig = () => {
    const videoConfig = (0, use_unsafe_video_config_1.useUnsafeVideoConfig)();
    if (!videoConfig) {
        throw new Error('No video config found. You are probably calling useVideoConfig() from a component which has not been registered as a <Composition />. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions for more information.');
    }
    return videoConfig;
};
exports.useVideoConfig = useVideoConfig;
//# sourceMappingURL=use-video-config.js.map