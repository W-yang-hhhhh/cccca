
import ReactDOM from "react-dom";
import { TextAreaComp } from "../components/TextArea";
import { getElementById } from ".";
import { AElementType, elementType } from "../types/element";
    //获取文本宽度
export const getTextWidth = (text:string,fontSize:number,fontFamily:string)=>{
    let OsCanvas = new OffscreenCanvas(100,100);
    let OsContext = OsCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    OsContext.font = `${fontSize}px ${fontFamily}`;
    const _w = OsContext.measureText(text).width;
    return _w;
}


export const getFonSizeByHeight = (height:number,colNum:number)=>{
    return height/colNum;
}


export const TextToEditMode = (element:AElementType[],id:string)=>{

    
    const currentElement = getElementById(element,id)?.getElementData();
    if(!currentElement || currentElement?.elementType !== elementType.text){
        return ;
    }
    const {x,y,width,height,angle,text,fontSize,fontFamily} = currentElement;
    const props = {
        x,
        y,
        w:width,
        h:height,
        angle: angle,
        value: text,
        font:`${fontSize}px ${fontFamily}`
    }
    
    const div = document.createElement('div');
	div.style.display = 'block';
	document.getElementsByClassName('canvasContainer')[0]?.appendChild(div);
	ReactDOM.render(<TextAreaComp {...props}/>, div);
}


