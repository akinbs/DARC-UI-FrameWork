export const containerSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
} as const;

export type ContainerSize = keyof typeof containerSizes;

export const defaultGutterPx = 16;