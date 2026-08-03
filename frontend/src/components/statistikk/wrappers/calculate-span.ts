export const PADDING = 32; // space-16
export const GAP = 24; // gap-6
export const ROW_HEIGHT = 250;

export const calculateSpan = (height: number) => Math.ceil((height + PADDING * 2 + GAP) / (ROW_HEIGHT + GAP));
