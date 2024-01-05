import { getElementById } from ".";
import { SelectEventType, SelectEventTypeDir } from "../event/mouseEvent/util";
import { Pos, Vec2 } from "../types";
import { mat2d, mat3, vec3 } from "gl-matrix";
import { AElementType } from "../types/element";
import { getFonSizeByHeight } from "./text";

export const transformElement = (
  eventType: SelectEventType,
  direction: SelectEventTypeDir,
  elementArr: any[],
  curId: string,
  startPos: Vec2,
  pos: Vec2,
  initData: any
) => {
  const {
    angle: startAngle,
    scale: startScale,
    x: startX,
    y: startY,
    width,
    height,
  } = initData;
  const currentElement = getElementById(elementArr, curId);
  if (!currentElement) return;
  const { angle: _a, x, y, fontSize, text } = currentElement.getElementData();
  const _cp = getElementCenterPoint(currentElement);
  if (eventType === SelectEventType.rotate) {
    //旋转
    const angle = getRotateAngle(_cp, startPos, pos);
    currentElement.changeProperty({
      angle: startAngle + (angle * Math.PI) / 180,
    });
  } else if (eventType === SelectEventType.scale) {
    //目前只有等比缩放

    const { _w, _h, _x, _y, fs } = getScaleInfo(direction, _cp, startPos, pos, {
      x: startX,
      y: startY,
      width,
      height,
      fontSize,
      text,
      angle: _a,
    });
    currentElement.changeProperty({
      width: _w,
      height: _h,
      x: _x,
      y: _y,
      fontSize: fs,
    });
  }
};

/**
 * 计算旋转角度
 *
 * @param {Array} centerPoint 旋转中心坐标
 * @param {Array} startPoint 旋转起点
 * @param {Array} endPoint 旋转终点
 *
 * @return {number} 旋转角度
 */

function getRotateAngle(centerPoint: Vec2, startPoint: Vec2, endPoint: Vec2) {
  const [centerX, centerY] = centerPoint;
  const [rotateStartX, rotateStartY] = startPoint;

  const [touchX, touchY] = endPoint;
  // 两个向量
  const v1: Vec2 = [rotateStartX - centerX, rotateStartY - centerY];
  const v2: Vec2 = [touchX - centerX, touchY - centerY];
  let rotateDegreeBefore = Math.atan2(v1[1], v1[0]) / (Math.PI / 180);
  let rotateDegreeAfter = Math.atan2(v2[1], v2[0]) / (Math.PI / 180);
  let a = rotateDegreeAfter - rotateDegreeBefore;
  return a;
}

function getElementCenterPoint(element: AElementType): Vec2 {
  const { x, y, width, height } = element.getElementData();
  // const px = x + width / 2;
  // const py = y + height / 2;
  // return [px, py];
  return getCp(x, y, width, height);
}

function getCp(x: number, y: number, width: number, height: number): Vec2 {
  const px = x + width / 2;
  const py = y + height / 2;
  return [px, py];
}

function getScaleInfo(
  direction: SelectEventTypeDir,
  _cp: Vec2,
  _startPos: Vec2,
  _pos: Vec2,
  currentElementInfo: any
) {
  const { width, height, x, y, fontSize, text, angle } = currentElementInfo;

  const vec = vec3.create();
  let _cVec = vec3.fromValues(..._cp, 1);
  let sVec = vec3.fromValues(..._startPos, 1);
  let pVec = vec3.fromValues(..._pos, 1);

  let startPos = vec3.rotateZ(vec, sVec, _cVec, -angle).slice(0, 2);
  let pos = vec3.rotateZ(vec, pVec, _cVec, -angle).slice(0, 2);
  
  // console.log(startPos,pos)
  let disY = pos[1] - startPos[1];
  let disX = pos[0] - startPos[0];
  if (
    direction === SelectEventTypeDir.II ||
    direction === SelectEventTypeDir.III
  ) {
    disY = -disY;
    disX = -disX;
  }

  let rows = text.split("\n").length;
  let proportion =
    // Math.abs(disX) / Math.abs(disY) < width / height
    false ? (height - disY) / height : (width - disX) / width;
  proportion = Number(proportion.toFixed(3));

  if (proportion < 0.5) {
    proportion = 0.5;
  }
  let _w = width;
  let _h = height;
  let _x = x;
  let _y = y;
  let fs = fontSize;
  switch (direction) {
    case SelectEventTypeDir.I:
      _w = width * proportion;
      _h = height * proportion;
      let [dx1, dy1] = getScaleAfterOffset(x, y, width, height, _w, _h, angle);
      _x = x + width - _w - dx1;
      _y = y + height - _h - dy1;
      fs = getFonSizeByHeight(_h, rows);
      break;
    case SelectEventTypeDir.II:
      _w = width * proportion;
      _h = height * proportion;
      let [dx2, dy2] = getScaleAfterOffset2(x, y, width, height, _w, _h, angle);
      _x = x + dx2;
      _y = y + dy2;
      fs = getFonSizeByHeight(_h, rows);
      break;
    case SelectEventTypeDir.III:
      _w = width * proportion;
      _h = height * proportion;

      let [dx3, dy3] = getScaleAfterOffset(x, y, width, height, _w, _h, angle);
      _x = x + dx3;
      _y = y + dy3;
      fs = getFonSizeByHeight(_h, rows);
      break;

    case SelectEventTypeDir.IV:
      _w = width * proportion;
      _h = height * proportion;
      let [dx4, dy4] = getScaleAfterOffset2(
        x,
        y,
        width,
        height,
        _w,
        _h,
        angle,
        "IV"
      );
      _x = x + dx4;
      _y = y + dy4;
      fs = getFonSizeByHeight(_h, rows);
      break;
  }

  return {
    _w,
    _h,
    _x,
    _y,
    fs,
  };
}

const getScaleAfterOffset = (
  x: number,
  y: number,
  w: number,
  h: number,
  w1: number,
  h1: number,
  angle: number
) => {
  let originCPoint = getCp(x, y, w, h);
  let newCPoint = getCp(x, y, w1, h1);

  let a = getRotateAfterPos(angle, [x, y], originCPoint);
  let b = getRotateAfterPos(angle, [x, y], newCPoint);
  return [a[0] - b[0], a[1] - b[1]];
};

const getScaleAfterOffset2 = (
  x: number,
  y: number,
  w: number,
  h: number,
  w1: number,
  h1: number,
  angle: number,
  dir?: string
) => {
  let originCPoint = getCp(x, y, w, h);
  let newCPoint = getCp(x, y, w1, h1);

  let a = getRotateAfterPos(angle, [x, y + h], originCPoint);
  let b = getRotateAfterPos(angle, [x, y + h1], newCPoint);

  if (dir === "IV") {
    a = getRotateAfterPos(angle, [x + w, y], originCPoint);
    b = getRotateAfterPos(angle, [x + w1, y], newCPoint);
  }
  return [a[0] - b[0], a[1] - b[1]];
};

const getRotateAfterPos = (angle: number, point: Vec2, cp: Vec2) => {
  const vec = vec3.create();
  let _cVec = vec3.fromValues(...cp, 1);
  let pVec = vec3.fromValues(...point, 1);

  let startPos = vec3.rotateZ(vec, pVec, _cVec, angle).slice(0, 2);
  return startPos;
};
