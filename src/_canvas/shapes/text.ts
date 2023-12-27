import { idToRgba } from "../helper";
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
      (this._element[_key] as any) = property[_key];
    });
  }
  draw(ctx: CanvasRenderingContext2D, oCtx: OffscreenCanvasRenderingContext2D) {
    const { text, x, y, width, height, fill, fontSize, angle,scale } = this._element;
    
    ctx.save();
    ctx.font = `${fontSize}px 宋体`;
    ctx.fillStyle = fill;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.translate(x + width/2,y+height/2);
    ctx.rotate(angle);
    // ctx.scale(scale[0],scale[1])
    ctx.fillText(text,-width/2,-height/2);
    ctx.restore();


    //////////////////////////***** OffScreenCanvas Paint *******????????????//////////////


    const [r, g, b, a] = idToRgba(this.id);
    oCtx.clearRect(0, 0, oCtx.canvas.width, oCtx.canvas.height);
    oCtx.save();
    oCtx.font = `${fontSize}px 宋体`;
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
