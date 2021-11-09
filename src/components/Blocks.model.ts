export enum BlockAction {
  HOVER = "hover",
  CLICK = "click",
}

export enum BlockType {
  EMPTY = "empty",
  SQUARE = "square",
  CIRCLE = "circle",
  DOT = "dot",
  DIAMOND = "diamond",
  CIRCLELINE = "circle-line",
  MOONLINE1 = "moon-line1",
  MOONLINE2 = "moon-line2",
  MOONLINE3 = "moon-line3",
  MOONLINE4 = "moon-line4",
  CORNER1 = "corner1",
  CORNER2 = "corner2",
  CORNER3 = "corner3",
  CORNER4 = "corner4",
  MOON1 = "moon1",
  MOON2 = "moon2",
  MOON3 = "moon3",
  MOON4 = "moon4",
}

export enum BlockColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  QUATERNARY = "quaternary",
}

export interface Block {
  type: BlockType;
  color: BlockColor;
}
export enum BlockSettingChange {
  HOVER = "hover",
  CLICK = "click",
  RANDOM = "random",
  AUDIO = "audio",
}

export interface State {
  showInfo: boolean;
  hover: boolean;
  random: boolean;
  click: boolean;
  audio: boolean;
  total: number;
  types: BlockType[];
  colors: BlockColor[];
  blocks: Block[];
}
