import ReactDOM from "react-dom";
import { TextAreaComp } from "../components/TextArea";
import { getElementById } from ".";
import { AElementType, elementType } from "../types/element";
//获取文本宽度
export const getTextWidth = (
  text: string,
  fontSize: number,
  fontFamily: string
) => {
  let OsCanvas = new OffscreenCanvas(100, 100);
  let OsContext = OsCanvas.getContext(
    "2d"
  ) as OffscreenCanvasRenderingContext2D;
  const textArr = text.split("\n");
  OsContext.font = `${fontSize}px ${fontFamily}`;
  let maxLengthText = textArr.sort(
    (a: string, b: string) => b.length - a.length
  )[0];
  const _w = OsContext.measureText(maxLengthText).width;
  return _w;
};

export const getFonSizeByHeight = (height: number, colNum: number) => {
  return height / colNum;
};

export const TextToEditMode = (elements: AElementType[], id: string) => {
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

  const props = {
    x: x,
    y: y,
    w: width,
    h: height,
    angle: angle,
    value: text,
    fontSize: fontSize,
    fontFamily: fontFamily,
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
    console.log("props", props);
    _currentElement.changeProperty(props);
    let canvas = document.getElementById("globalCanvas") as any;
    // (canvas as any).style.display = 'none';
    _currentElement.changeProperty({ hidden: false });
    document.getElementsByClassName("canvasContainer")[0]?.removeChild(canvas);
  };
};
