import { getElementById } from ".";
import { SelectEventType, SelectEventTypeDir } from "../event/mouseEvent/util";
import { Pos, Vec2 } from "../types";
import {mat3} from 'gl-matrix';
import { AElementType } from "../types/element";

export const transformElement = (
  eventType: SelectEventType,
  direction: SelectEventTypeDir,
  elementArr: any[],
  curId: string,
  startPos: Vec2,
  pos: Vec2
) => {
    const currentElement = getElementById(elementArr,curId);
    if(!currentElement)return;
    const {angle: _a} = currentElement.getElementData();
    if(eventType === SelectEventType.rotate){
        const _cp = getElementCenterPoint(currentElement);
        const angle = getRotateAngle(_cp,startPos,pos);
        console.log('angle',angle)
        currentElement.changeProperty({
            angle:angle + _a
        })
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

function getRotateAngle(centerPoint:Vec2, startPoint:Vec2, endPoint:Vec2) {
    const [centerX, centerY] = centerPoint;
    const [rotateStartX, rotateStartY] = startPoint;
    const [touchX, touchY] = endPoint;
    // 两个向量
    const v1 = [rotateStartX - centerX, rotateStartY - centerY];
    const v2 = [touchX - centerX, touchY - centerY];
    // 公式的分子
    const numerator =  v1[0] * v2[1] - v1[1] * v2[0];
    // 公式的分母
    const denominator = Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2)) 
        * Math.sqrt(Math.pow(v2[0], 2) + Math.pow(v2[1], 2));
    const sin = numerator / denominator;
    return Math.asin(sin);
}



function getElementCenterPoint(element:AElementType):Vec2 {
    const {x,y,width,height} = element.getElementData();
    const px = x+ width / 2;
    const py = y+ height/2
    return [px,py]

}

