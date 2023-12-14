import { ActionType } from "../../eventSimulator";
import { getElementById } from "../../helper";





let isMouseDown = false;
let startPointX = 0;
let startPointY = 0;
export const canvasGlobalMouseEventHandle = (evt:MouseEvent,type:ActionType,id:string='',elements:any)=>{
    
    const offsetX = evt.offsetX;
    const offsetY = evt.offsetY;

    // console.log('xxx',offsetX,offsetY)
    if(type === ActionType.Down){
        isMouseDown = true;

        id && getElementById(elements,id,(element)=>{
            const {x,y} = element.getTextElementData();
            startPointX = offsetX - x;
            startPointY = offsetY - y;
            
        })
    }


    if(type === ActionType.Move){

        if(isMouseDown && id){
            
            id && getElementById(elements,id,(element)=>{
                
                // console.log()
                const x = offsetX - startPointX;
                const y = offsetY - startPointY;
                element.changeProperty({
                    x, 
                    y,
                })
                
            })
        }
       
    }


    if(type === ActionType.Up){
        isMouseDown = false;
    }



}