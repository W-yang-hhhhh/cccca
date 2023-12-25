import Stage from "../..";
import { ActionType } from "../../eventSimulator";
import { getElementById } from "../../helper";
import { transformElement } from "../../helper/transform";
import {
  SelectEventType,
  SelectEventTypeDir,
  getSelectionElementEventType,
} from "./util";

let isMouseDown = false;
let startPointX = 0;
let startPointY = 0;
let currentId = ""; //点击下的 id
let eventType: undefined | SelectEventType = undefined;
let direction: undefined | SelectEventTypeDir = undefined;
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
      //拖拽缩放旋转
      if (eventType && direction) {
        transformElement(
          eventType,
          direction,
          elements,
          this.currentSelectId,
          { x: startPointX, y: startPointY },
          {
            x: offsetX,
            y: offsetY,
          }
        );
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
    }

    //--mouseMove
    this.currentSelectId &&
      getElementById(elements, this.currentSelectId, (element) => {
        const { direction: _d, eventType: _e } = getSelectionElementEventType(
          element,
          { x: offsetX, y: offsetY }
        );
        direction = _d;
        eventType = _e;
      });

    if (this.currentSelectId) {
    }
  }

  //mouseUp
  if (type === ActionType.Up) {
    isMouseDown = false;
    currentId = "";
  }

  //mouseLeave
  if (type === ActionType.Leave) {
    //状态清空
    isMouseDown = false;
    currentId = "";
  }
}
