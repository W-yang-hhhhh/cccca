import Stage from "../..";
import { ActionType } from "../../eventSimulator";
import { getElementById } from "../../helper";
import { TextToEditMode } from "../../helper/text";
import { transformElement } from "../../helper/transform";
import { renderGuideLine } from "../../render/guideLine";
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
let editId = "";
let eventType: undefined | SelectEventType = undefined;
let direction: undefined | SelectEventTypeDir = undefined;

let startAngle = 0;
let startScale = [1, 1];
let initData = { x: 0, y: 0, width: 0, height: 0, fontSize: 0 };

let canvasCenterX = 0;
let canvasCenterY = 0;
//双击延迟
let lastTime:any = null; // 记录上一次点击时间
const doubleClickDelay = 300;
export function canvasGlobalMouseEventHandle(
  this: Stage,
  evt: MouseEvent,
  type: ActionType,
  id: string = "",
  elements: any
) {
  const offsetX = evt.offsetX;
  const offsetY = evt.offsetY;
  canvasCenterX = parseInt(this.ctx.canvas.style.width) / 2;
  canvasCenterY = parseInt(this.ctx.canvas.style.height) / 2;
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
          
          const {width, height} = element?.getElementData() || {width: 0,height:0};
          console.log('element',width, height)
          let x = offsetX - startPointX;
          let y = offsetY - startPointY;

          if(Math.abs((x + width/2) - canvasCenterX)<20){
            x = canvasCenterX - width/2;
            this.needGuideLine[1] = true;
          }else {
            this.needGuideLine[1] = false;
          }
          if(Math.abs((y + height/2) - canvasCenterY)<20){
            
            y = canvasCenterY - height/2;
            this.needGuideLine[0] = true;
          }else {
            this.needGuideLine[0] = false;
          }
        
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
    this.needGuideLine = [false ,false]
  }

  //mouseLeave
  if (type === ActionType.Leave) {
    //状态清空
    isMouseDown = false;
    currentId = "";
  }

  //dbClick 
  if(type === ActionType.DbClick){

    const currentTime = new Date().getTime();
    
    if (lastTime && currentTime - lastTime < doubleClickDelay) {
        console.log("这是最后一次点击");
        TextToEditMode.call(this,elements,id);
        // 如果需要执行其他操作，可以将相应的代码放在此处
    } else {
        console.log("不是最后一次点击");
    }
    
    lastTime = currentTime;
    
  }
}
