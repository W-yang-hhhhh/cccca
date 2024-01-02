import Stage from "../..";
import { ActionType } from "../../eventSimulator";
import { getElementById } from "../../helper";
import { transformElement } from "../../helper/transform";
import {
  SelectEventType,
  SelectEventTypeDir,
  getSelectionElementEventType,
  getSelectionElementEventTypeById,
} from "./util";

let isMouseDown = false;
let startPointX = 0;
let startPointY = 0;
let currentId = ""; //点击下的 id

let eventType: undefined | SelectEventType = undefined;
let direction: undefined | SelectEventTypeDir = undefined;

let startAngle = 0;
let startScale = [1, 1];
let initData = { x: 0, y: 0, width: 0, height: 0, fontSize: 0 };
export function canvasGlobalMouseEventHandle(
  this: Stage,
  evt: MouseEvent,
  type: ActionType,
  id: string = "",
  elements: any
) {
  const offsetX = evt.offsetX;
  const offsetY = evt.offsetY;

  //mouseDown
  if (type === ActionType.Down) {
    isMouseDown = true;
    //有事件类型特出处理
    if (eventType) {
      getElementById(elements, this.currentSelectId, (element) => {
        const { angle, scale, x, y, width, height, fontSize } =
          element.getElementData();
        initData = {
          x,
          y,
          width,
          height,
          fontSize,
        };
        startAngle = angle;
        startScale = scale;
      });
      startPointX = offsetX;
      startPointY = offsetY;
      return;
    }

    id &&
      getElementById(elements, id, (element) => {
        const { x, y } = element.getElementData();
        startPointX = offsetX - x;
        startPointY = offsetY - y;
        currentId = id;
      });

    this.currentSelectId = id;
  }

  //mouseMove
  if (type === ActionType.Move) {
    //--under mouseDown

    if (isMouseDown) {
      //缩放旋转
      if (eventType && direction) {
        transformElement(
          eventType,
          direction,
          elements,
          this.currentSelectId,
          [startPointX, startPointY],
          [offsetX, offsetY],
          { angle: startAngle, scale: startScale, ...initData }
        );
        return;
      }

      //拖拽位移
      currentId &&
        getElementById(elements, currentId, (element) => {
          const x = offsetX - startPointX;
          const y = offsetY - startPointY;
          element?.changeProperty({
            x,
            y,
          });
        });

      return;
    }

    //--mouseMove
    // this.currentSelectId &&
    //   getElementById(elements, this.currentSelectId, (element) => {
    //     const { direction: _d, eventType: _e } = getSelectionElementEventType(
    //       element,
    //       { x: offsetX, y: offsetY }
    //     );
    //     direction = _d;
    //     eventType = _e;
    //   });
    const { direction: _d, eventType: _e } =
      getSelectionElementEventTypeById(id);
    direction = _d;
    eventType = _e;
    if (this.currentSelectId) {
    }
  }

  //mouseUp
  if (type === ActionType.Up) {
    isMouseDown = false;
    currentId = "";
    startAngle = 0;
    eventType = undefined;
    direction = undefined;
  }

  //mouseLeave
  if (type === ActionType.Leave) {
    //状态清空
    isMouseDown = false;
    currentId = "";
  }

  //dbClick 
  if(type === ActionType.DbClick){
    console.log('dbclock',id);
    
  }
}
