import { ActionType } from "../../eventSimulator";
import { getElementById } from "../../helper";





let isMouseDown = false;
export const canvasGlobalMouseEventHandle = (evt:MouseEvent,type:ActionType,id:string,elements:any)=>{

    const x = evt.offsetX;
    const y = evt.offsetY;
    if(type === ActionType.Down){
        isMouseDown = true;
    }


    if(type === ActionType.Move){

        id && getElementById(elements,id,(element)=>{
            element.changeProperty({
                x,
                y
            })
        })
    }


    if(type === ActionType.Up){
        isMouseDown = false;
    }



}