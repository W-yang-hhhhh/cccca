import { useMemo, useState } from "react";
import styled from "styled-components";
import { getTextWidth } from "../../helper/text";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  value: string;
  fontSize: number;
  fontFamily: string;
  onblur: any;
}
export const TextAreaComp = (props: Props) => {
  const { x, y, w, h, angle,value,fontSize,fontFamily, onblur } = props;
  const [val, setVal]= useState({
    text: value,
    height: h,
    width: w,
  });
  const computed = useMemo(() => {
    return {
      width: `${val.width}px`,
      height: `${val.height}px`,
      left: `${x}px`,
      top: `${y}px`,
      transform: `rotate(${angle}deg)`,
      font: `${fontSize}px / 1 ${fontFamily}`
    };
  }, [val]);

  const onBlurHandle = (e:any)=>{
    console.log('e',e)
    const {value,offsetHeight,offsetWidth,rows} = e.target;
    onblur({
        height: val.height,
        width: offsetWidth,
        text: value

    })
  }
  const onChangeHandle = (e:any)=>{
    const {value,offsetHeight,offsetWidth,rows} = e.target;
    console.log('changeEvent',offsetHeight * rows);
    setVal(pre=>({
        ...pre,
        text:e.target.value,
        height: offsetHeight * rows,
        width:getTextWidth(e.target.value,fontSize,fontFamily)
    }));
  }

  return (
    <TextAreaCss
      dir="auto"
      tabIndex={0}
      value={val.text}
      style={computed}
      className="a1TextArea"
      onBlur={onBlurHandle}
      onChange={onChangeHandle}
    ></TextAreaCss>
  );
};

const TextAreaCss = styled.textarea`
  position: absolute;
  display: inline-block;
  min-height: 1em;
  backface-visibility: hidden;
  margin: 0px;
  padding: 0px;
  border: 0px;
  outline: 0px;
  resize: none;
  background: transparent;
  overflow: hidden;
  word-break: normal;
  white-space: pre;
  overflow-wrap: break-word;
  box-sizing: content-box;
  /* font: 36px / 1.25 Virgil, Segoe UI Emoji; */
  text-align: left;
  vertical-align: top;
  color: rgb(30, 30, 30);
  opacity: 1;
  /* filter: var(--theme-filter); */
  /* max-height: 1602.7px; */
`;