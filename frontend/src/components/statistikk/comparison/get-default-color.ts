import { OptionValue } from '../../../types/statistics/common';

export const getDefaultColor = (options: OptionValue[]): string => {
  const usedColors = options.map(([, color]) => color);

  return COLORS.find((color) => !usedColors.includes(color)) ?? '#a5a5a5';
};

const RGB_COLORS = [
  // Blue
  [
    [230, 240, 255],
    [204, 225, 255],
    [153, 195, 255],
    [102, 165, 244],
    [51, 134, 224],
    [0, 103, 197],
    [0, 86, 180],
    [0, 69, 156],
    [0, 52, 125],
    [0, 34, 82],
  ],

  // Orange
  [
    [255, 249, 240],
    [255, 236, 204],
    [255, 215, 153],
    [255, 193, 102],
    [255, 170, 51],
    [255, 145, 0],
    [212, 123, 0],
    [168, 100, 0],
    [125, 76, 0],
    [82, 51, 0],
  ],

  // Green
  [
    [243, 252, 245],
    [204, 241, 214],
    [153, 222, 173],
    [102, 199, 134],
    [51, 170, 95],
    [6, 137, 58],
    [0, 124, 46],
    [0, 106, 35],
    [0, 85, 25],
    [0, 59, 15],
  ],

  // Purple
  [
    [239, 236, 244],
    [224, 216, 233],
    [192, 178, 210],
    [161, 141, 187],
    [130, 105, 162],
    [99, 70, 137],
    [82, 56, 116],
    [65, 43, 93],
    [48, 31, 70],
    [31, 20, 47],
  ],

  // Red
  [
    [255, 230, 230],
    [255, 184, 184],
    [246, 130, 130],
    [242, 92, 92],
    [222, 46, 46],
    [195, 0, 0],
    [173, 0, 0],
    [140, 0, 0],
    [92, 0, 0],
    [38, 0, 0],
  ],

  // Deepblue
  [
    [230, 241, 248],
    [204, 226, 240],
    [153, 196, 221],
    [102, 163, 196],
    [51, 128, 165],
    [0, 91, 130],
    [0, 80, 119],
    [0, 67, 103],
    [0, 52, 83],
    [0, 36, 58],
  ],

  // Lime
  [
    [253, 255, 230],
    [249, 252, 204],
    [236, 243, 153],
    [217, 227, 102],
    [193, 203, 51],
    [162, 173, 0],
    [147, 158, 0],
    [127, 137, 0],
    [102, 110, 0],
    [71, 78, 0],
  ],

  // Lightblue
  [
    [235, 252, 255],
    [216, 249, 255],
    [181, 241, 255],
    [151, 230, 255],
    [124, 218, 248],
    [102, 203, 236],
    [76, 173, 205],
    [54, 141, 168],
    [35, 107, 125],
    [19, 72, 82],
  ],

  // Grey
  [
    [247, 247, 247],
    [241, 241, 241],
    [229, 229, 229],
    [207, 207, 207],
    [176, 176, 176],
    [143, 143, 143],
    [112, 112, 112],
    [89, 89, 89],
    [64, 64, 64],
    [38, 38, 38],
  ],
];

const rgbToHex = (rgb: number[]) =>
  `#${((1 << 24) + (Number(rgb[0]) << 16) + (Number(rgb[1]) << 8) + Number(rgb[2])).toString(16).slice(1)}`;

const SHADE_ORDER = [5, 9, 2, 7, 3, 8, 4, 1, 6, 0];

export const COLORS = SHADE_ORDER.reduce<string[]>((acc, shade) => {
  const colors = RGB_COLORS.map((mainColor) => mainColor[shade] ?? []).map(rgbToHex);

  return [...acc, ...colors];
}, []);
