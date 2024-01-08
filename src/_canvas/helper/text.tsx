import ReactDOM from "react-dom";
import { TextAreaComp } from "../components/TextArea";
import { getElementById } from ".";
import { AElementType, elementType } from "../types/element";
//获取文本宽度

let cacheText = "";
let cacheFontSize = 0;
let cacheFontFamily = "";
let cacheMaxLengthText = 0;
export const getTextWidth = (
  text: string,
  fontSize: number,
  fontFamily: string
) => {
  if (
    cacheText === text &&
    cacheFontSize === fontSize &&
    cacheFontFamily === fontFamily &&
    cacheMaxLengthText
  ) {
    return cacheMaxLengthText;
  }
  cacheText = text;
  cacheFontSize = fontSize;
  cacheFontFamily = fontFamily;

  let OsCanvas = new OffscreenCanvas(100, 100);
  let OsContext = OsCanvas.getContext(
    "2d"
  ) as OffscreenCanvasRenderingContext2D;
  const textArr = text.split("\n");
  OsContext.font = `${fontSize}px ${fontFamily}`;
  let maxLengthText = 0;
  //   let maxLengthText = textArr.sort(
  //     (a: string, b: string) => b.length - a.length
  //   )[0];
  textArr.forEach((item) => {
    let width = OsContext.measureText(item).width;
    if (width > maxLengthText) maxLengthText = width;
  });
  //   const _w = OsContext.measureText(maxLengthText).width;
  cacheMaxLengthText = maxLengthText;
  return maxLengthText;
};

export const getFonSizeByHeight = (height: number, colNum: number) => {
  return height / colNum;
};

export const TextToEditMode = function (
  this: any,
  elements: AElementType[],
  id: string
) {
  const currentElement = getElementById(elements, id);
  const currentElementData = currentElement?.getElementData();
  if (!currentElement || currentElementData?.elementType !== elementType.text) {
    return;
  }
  currentElement.changeProperty({
    hidden: true,
  });
  const { x, y, width, height, angle, text, fontSize, fontFamily } =
    currentElementData;

  const blurEventHandle = getBlurEvent(currentElement);
  const maxWidth = getMaxTextAreaWidth(this, currentElement);
  const maxHeight = getMaxTextAreaHeight(this, currentElement);
  const props = {
    x: x,
    y: y,
    w: width,
    h: height,
    angle: angle,
    value: text,
    fontSize: fontSize,
    fontFamily: fontFamily,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    onblur: blurEventHandle,
  };

  const div = document.createElement("div");
  div.style.display = "block";
  div.id = "globalCanvas";
  document.getElementsByClassName("canvasContainer")[0]?.appendChild(div);
  ReactDOM.render(<TextAreaComp {...props} />, div);
};

interface Props {
  text: string;
  width: number;
  height: number;
}

const getBlurEvent = (currentElement: AElementType) => {
  let _currentElement = currentElement;

  return (props: Props) => {
    _currentElement.changeProperty(props);
    let canvas = document.getElementById("globalCanvas") as any;
    _currentElement.changeProperty({ hidden: false });
    document.getElementsByClassName("canvasContainer")[0]?.removeChild(canvas);
  };
};

const getMaxTextAreaWidth = (context: any, currentElement: AElementType) => {
  const { x, width, angle } = currentElement.getElementData();

  const canvasWidth = parseInt(context.ctx.canvas.style.width);
  if (x < 0) {
    return width + x;
  }
  const cosW = canvasWidth - x;
  console.log("canvasWidth", cosW);
  return cosW;
};

const getMaxTextAreaHeight = (context: any, currentElement: AElementType) => {
  const { y, height, width, angle } = currentElement.getElementData();
  const canvasHeight = parseInt(context.ctx.canvas.style.height);
  if (y < 0) {
    return height + y;
  }
  const _y = y - (width / 2) * Math.cos(angle);
  const cosH = canvasHeight - _y;
  return cosH;
};
