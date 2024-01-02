import { idToRgba } from "../helper";
import { getTextWidth } from "../helper/text";
import { elementType } from "../types/element";
import shapesBase from "./base";

interface textType {
  elementType: elementType;
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  stroke: string;
  lineHeight: number;
  letterSpace: number;
  x: number;
  y: number;
  angle: number;
  scale:[number, number];
  width: number;
  height: number;
  hidden: boolean;
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
  angle: 0,
  scale:[1, 1] as [number, number],
  width: 0,
  height: 0,
  hidden: false,
};

export default class Text extends shapesBase {
  private _element: textType;

  constructor(_textElement: Partial<textType>) {
    super();
    this._element = { ...defaultTextValue, ..._textElement };
  }

  changeProperty(property: Partial<textType>) {
    let keyArr = Object.keys(property) as Array<keyof textType>;
    keyArr.forEach((_key) => {
      if(_key === 'text'){
        //特殊处理
        const width = getTextWidth(property[_key] ||'',this._element.fontSize,this._element.fontFamily)
        this._element.width = width;
      }else if(_key === 'fontFamily'){
        const width = getTextWidth(this._element.text,this._element.fontSize,property[_key] || this._element.fontFamily)
        this._element.width = width;
      }
      (this._element[_key] as any) = property[_key];
    });
  }
  draw(ctx: CanvasRenderingContext2D, oCtx: OffscreenCanvasRenderingContext2D) {
    const { text, x, y, width, height, fill, fontSize, angle,scale,hidden,fontFamily } = this._element;
    if(hidden) return ;
    const textArr = text.split('\n');
    ctx.save();
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fill;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.translate(x + width/2,y+height/2);
    ctx.rotate(angle);
    // ctx.scale(scale[0],scale[1])
    textArr.forEach((item,index)=>{
      ctx.fillText(item,-width/2,-height/2 + fontSize * index);
    })
    
    ctx.restore();


    //////////////////////////***** OffScreenCanvas Paint *******????????????//////////////


    const [r, g, b, a] = idToRgba(this.id);
    oCtx.save();
    oCtx.font = `${fontSize}px ${fontFamily}`;
    oCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    oCtx.textAlign = "left";
    oCtx.textBaseline = "top";

    oCtx.translate(x + width/2,y + height/2);
    oCtx.rotate(angle);
    oCtx.fillRect( - width/2,  - height/2, width, height);
    oCtx.restore();
  }

  getElementData() {
    return this._element;
  }
}
