import Stage from "../..";
import { ActionType } from "../../eventSimulator";
import { getElementById } from "../../helper";

let isMouseDown = false;
let startPointX = 0;
let startPointY = 0;
let currentId = "";
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
    id &&
      getElementById(elements, id, (element) => {
        const { x, y } = element.getTextElementData();
        startPointX = offsetX - x;
        startPointY = offsetY - y;
        currentId = id;
      });

    this.currentSelectId = id;
  }

  //mouseMove
  if (type === ActionType.Move) {
    if (isMouseDown && currentId) {
      getElementById(elements, currentId, (element) => {
        const x = offsetX - startPointX;
        const y = offsetY - startPointY;
        element.changeProperty({
          x,
          y,
        });
      });
    }
  }

  //mouseUp
  if (type === ActionType.Up) {
    isMouseDown = false;
  }

  //mouseLeave
  if (type === ActionType.Leave) {
    //状态清空
    isMouseDown = false;
    currentId = "";
  }
}
