import { getElementById } from "../../helper";
import { Pos } from "../../types";
import { AElementType } from "../../types/element";

export enum SelectEventType {
  drag = "drag",
  scale = "scale",
  rotate = "rotate",
}
export enum SelectEventTypeDir {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
}
const HOT_RANGE_SCALE = 4;
const HOT_RANGE_ROTATE = 22;
/**
 * [*****暂时废弃]
 */
export const getSelectionElementEventType = (
  element: AElementType,
  pos: Pos
) => {
  const can = document.getElementById("mainCanvas");
  const { x: _x, y: _y } = pos;
  const { x, y, width, height } = element.getElementData();

  let direction = undefined;
  let eventType = undefined;
  //旋转
  if (
    _x > x - HOT_RANGE_ROTATE &&
    _x < x + HOT_RANGE_SCALE &&
    _y > y - HOT_RANGE_ROTATE &&
    _y < y + HOT_RANGE_SCALE
  ) {
    direction = SelectEventTypeDir.I;
    eventType = SelectEventType.rotate;
  } else if (
    _x > x - HOT_RANGE_ROTATE &&
    _x < x + HOT_RANGE_SCALE &&
    _y > y + height - HOT_RANGE_SCALE &&
    _y < y + HOT_RANGE_ROTATE + height
  ) {
    direction = SelectEventTypeDir.IV;
    eventType = SelectEventType.rotate;
  } else if (
    _x > x + width - HOT_RANGE_SCALE &&
    _x < x + HOT_RANGE_ROTATE + width &&
    _y > y - HOT_RANGE_ROTATE &&
    _y < y + HOT_RANGE_SCALE
  ) {
    direction = SelectEventTypeDir.II;
    eventType = SelectEventType.rotate;
  } else if (
    _x > x + width - HOT_RANGE_SCALE &&
    _x < x + HOT_RANGE_ROTATE + width &&
    _y > y + height - HOT_RANGE_SCALE &&
    _y < y + HOT_RANGE_ROTATE + height
  ) {
    direction = SelectEventTypeDir.III;
    eventType = SelectEventType.rotate;
  }

  // 缩放拖拽
  if (
    _x > x - HOT_RANGE_SCALE &&
    _x < x + HOT_RANGE_SCALE &&
    _y > y - HOT_RANGE_SCALE &&
    _y < y + HOT_RANGE_SCALE
  ) {
    direction = SelectEventTypeDir.I;
    eventType = SelectEventType.scale;
  } else if (
    _x > x - HOT_RANGE_SCALE &&
    _x < x + HOT_RANGE_SCALE &&
    _y > y - HOT_RANGE_SCALE + height &&
    _y < y + HOT_RANGE_SCALE + height
  ) {
    direction = SelectEventTypeDir.IV;
    eventType = SelectEventType.scale;
  } else if (
    _x > x - HOT_RANGE_SCALE + width &&
    _x < x + HOT_RANGE_SCALE + width &&
    _y > y - HOT_RANGE_SCALE &&
    _y < y + HOT_RANGE_SCALE
  ) {
    direction = SelectEventTypeDir.II;
    eventType = SelectEventType.scale;
  } else if (
    _x > x - HOT_RANGE_SCALE + width &&
    _x < x + HOT_RANGE_SCALE + width &&
    _y > y - HOT_RANGE_SCALE + height &&
    _y < y + HOT_RANGE_SCALE + height
  ) {
    direction = SelectEventTypeDir.III;
    eventType = SelectEventType.scale;
  }

  if (eventType === SelectEventType.scale) {
    document.body.style.cursor = "nesw-resize";
  } else if (eventType === SelectEventType.rotate) {
    document.body.style.cursor = "crosshair";
  } else {
    document.body.style.cursor = "auto";
  }
  return {
    eventType,
    direction,
  };
};

export const getSelectionElementEventTypeById = (id: string) => {
  let direction = undefined;
  let eventType = undefined;
  switch (id) {
    case "0-0-0-255":
      direction = SelectEventTypeDir.I;
      eventType = SelectEventType.scale;
      break;
    case "1-1-1-255":
      direction = SelectEventTypeDir.II;
      eventType = SelectEventType.scale;
      break;
    case "2-2-2-255":
      direction = SelectEventTypeDir.III;
      eventType = SelectEventType.scale;
      break;
    case "3-3-3-255":
      direction = SelectEventTypeDir.IV;
      eventType = SelectEventType.scale;
      break;
    case "4-4-4-255":
      direction = SelectEventTypeDir.I;
      eventType = SelectEventType.rotate;
      break;
    case "5-5-5-255":
      direction = SelectEventTypeDir.II;
      eventType = SelectEventType.rotate;
      break;
    case "6-6-6-255":
      direction = SelectEventTypeDir.III;
      eventType = SelectEventType.rotate;
      break;
    case "7-7-7-255":
      direction = SelectEventTypeDir.IV;
      eventType = SelectEventType.rotate;
      break;
  }

  if (eventType === SelectEventType.scale) {
    document.body.style.cursor = "nesw-resize";
  } else if (eventType === SelectEventType.rotate) {
    document.body.style.cursor = "crosshair";
  } else {
    document.body.style.cursor = "auto";
  }

  return {
    direction,
    eventType,
  };
};
