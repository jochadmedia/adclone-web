declare type ExtrapolateType = 'extend' | 'identity' | 'clamp';
export declare function interpolate(input: number, inputRange: readonly number[], outputRange: readonly number[], options?: {
    easing?: (input: number) => number;
    extrapolateLeft?: ExtrapolateType;
    extrapolateRight?: ExtrapolateType;
}): number;
export {};
//# sourceMappingURL=interpolate.d.ts.map