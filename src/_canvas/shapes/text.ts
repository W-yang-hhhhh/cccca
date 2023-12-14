import { idToRgba } from "../helper";
import { elementType } from "../types/elment";
import shapesBase from "./base";

interface textType {
  elementType: elementType,
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  stroke: string;
  lineHeight: number;
  letterSpace: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
const defaultTextValue = {
  elementType: elementType.text,
  text: "",
  fontFamily: "宋体",
  fontSize: 40,
  fill: "#000",
  stroke: "#000",
  lineHeight: 12,
  letterSpace: 1,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export default class Text extends shapesBase {
  private textElement: textType;

  constructor(_textElement: Partial<textType>) {
    super();
    this.textElement = { ...defaultTextValue, ..._textElement };

  }


  changeProperty(property:Partial<textType>){
   let keyArr= Object.keys(property) as Array<keyof textType> ; 
   keyArr.forEach(_key =>{
    (this.textElement[_key] as any) = property[_key];
   })
  }
  draw(ctx: CanvasRenderingContext2D,oCtx: OffscreenCanvasRenderingContext2D) {
    
    const{text,x,y,width,height,fill,fontSize} = this.textElement;
    let length = ctx.measureText(text).width
    ctx.font = `${fontSize}px 宋体`;
    ctx.fillStyle = fill;
    ctx.textAlign = 'left';
    ctx.textBaseline = "top";
    ctx.fillText(text,x,y,width);
    // ctx.restore();


    ////// OffScreenCanvas Paint //////////////

    const [r, g, b, a] = idToRgba(this.id);
    oCtx.font = `${fontSize}px 宋体`;
    
    // oCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    // oCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    // oCtx.fillText(text,40,40,200);
    oCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    oCtx.textAlign = 'left';
    ctx.textBaseline = "top";
    oCtx.fillRect(x,y,width,height);
  }


  getTextElementData(){
    return this.textElement;
  }
}
