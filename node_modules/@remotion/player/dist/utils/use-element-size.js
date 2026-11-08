"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementSize = void 0;
const react_1 = require("react");
const useElementSize = (ref, options) => {
    const [size, setSize] = (0, react_1.useState)(null);
    const observer = (0, react_1.useMemo)(() => {
        if (typeof ResizeObserver === 'undefined') {
            return null;
        }
        return new ResizeObserver((entries) => {
            const newSize = entries[0].target.getClientRects();
            if (!newSize || !newSize[0]) {
                setSize(null);
                return;
            }
            setSize({
                width: newSize[0].width,
                height: newSize[0].height,
                left: newSize[0].x,
                top: newSize[0].y,
            });
        });
    }, []);
    const updateSize = (0, react_1.useCallback)(() => {
        if (!ref.current) {
            return;
        }
        const rect = ref.current.getClientRects();
        if (!rect[0]) {
            setSize(null);
            return;
        }
        setSize({
            width: rect[0].width,
            height: rect[0].height,
            left: rect[0].x,
            top: rect[0].y,
        });
    }, [ref]);
    (0, react_1.useEffect)(() => {
        if (!observer) {
            return;
        }
        updateSize();
        const { current } = ref;
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [observer, ref, updateSize]);
    (0, react_1.useEffect)(() => {
        if (!options.triggerOnWindowResize) {
            return;
        }
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [options.triggerOnWindowResize, updateSize]);
    return size;
};
exports.useElementSize = useElementSize;
//# sourceMappingURL=use-element-size.js.map