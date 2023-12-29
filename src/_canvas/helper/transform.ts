import { getElementById } from ".";
import { SelectEventType, SelectEventTypeDir } from "../event/mouseEvent/util";
import { Pos, Vec2 } from "../types";
import { mat2d, mat3 } from "gl-matrix";
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
  const { angle: _a, x, y, fontSize } = currentElement.getElementData();
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
      fontSize
    });

    currentElement.changeProperty({
      width: _w,
      height: _h,
      x: _x,
      y: _y,
      fontSize: fs
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
  const px = x + width / 2;
  const py = y + height / 2;
  return [px, py];
}

function getScaleInfo(
  direction: SelectEventTypeDir,
  _cp: Vec2,
  startPos: Vec2,
  pos: Vec2,
  currentElementInfo: any
) {
  let disY = pos[1] - startPos[1];
  let disX = pos[0] - startPos[0];
    if(direction === SelectEventTypeDir.II || direction === SelectEventTypeDir.III ){
        disY = -disY;
        disX = -disX;
    }
  const { width, height, x, y, fontSize } = currentElementInfo;
  let proportion =
    // Math.abs(disY) >= Math.abs(disX)
    false
      ? (height - disY) / height
      : (width - disX) / width;
  proportion = Number(proportion.toFixed(3));
  if(proportion < 0.5){
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
      _x = x + width - _w;
      _y = y + height - _h;
      fs = getFonSizeByHeight(_h,1);
      break;
    case SelectEventTypeDir.II:
      _w = width * proportion;
      _h = height * proportion;
      _x = x ;
      _y = y + height - _h;
      fs = getFonSizeByHeight(_h,1);
      break;
    case SelectEventTypeDir.III:
      _w = width * proportion;
      _h = height * proportion;
      _x = x;
      _y = y;
      fs = getFonSizeByHeight(_h,1);
      break;

    case SelectEventTypeDir.IV:
        _w = width * proportion;
      _h = height * proportion;
      _x = x + width - _w;
      _y = y ;
      fs = getFonSizeByHeight(_h,1);
      break;
  }

  return {
    _w,
    _h,
    _x,
    _y,
    fs
  };
}


