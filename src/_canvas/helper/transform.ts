import { getElementById } from ".";
import { SelectEventType, SelectEventTypeDir } from "../event/mouseEvent/util";
import { Pos, Vec2 } from "../types";
import { mat2d } from "gl-matrix";
import { AElementType } from "../types/element";

export const transformElement = (
  eventType: SelectEventType,
  direction: SelectEventTypeDir,
  elementArr: any[],
  curId: string,
  startPos: Vec2,
  pos: Vec2,
  initData: any
) => {
  const { angle: startAngle } = initData;
  const currentElement = getElementById(elementArr, curId);
  if (!currentElement) return;
  const { angle: _a, x, y } = currentElement.getElementData();
  if (eventType === SelectEventType.rotate) {
    const _cp = getElementCenterPoint(currentElement);
    const angle = getRotateAngle(_cp, startPos, pos);
    console.log("xp", angle);
    currentElement.changeProperty({
      angle: startAngle + (angle * Math.PI) / 180,
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
