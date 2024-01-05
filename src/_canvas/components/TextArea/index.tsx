import { useEffect, useMemo, useState } from "react";
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
  maxWidth: number;
  maxHeight: number;
}
export const TextAreaComp = (props: Props) => {
  const { x, y, w, h, angle, value, fontSize, fontFamily, onblur, maxWidth, maxHeight } = props;
  const [val, setVal] = useState({
    text: value,
    height: h,
    width: w,
  });

  const computed = useMemo(() => {
    return {
      width: `${val.width}px`,
      height: `${val.height + 6}px`,
      left: `${x}px`,
      top: `${y}px`,
      transform: `rotate(${(angle / Math.PI) * 180}deg)`,
      font: `${fontSize}px / 1 ${fontFamily}`,
      lineHeight: `${fontSize}px`,
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`
    };
  }, [val]);

  const onBlurHandle = (e: any) => {
    
    const { value, offsetHeight, offsetWidth, rows, textContent } = e.target;
    
    onblur({
      height: val.height,
      width: offsetWidth,
      text: value,
    });
  };
  const onChangeHandle = (e: any) => {
    const { value, offsetHeight, offsetWidth, rows } = e.target;
    
    const heightLength = value.split("\n").length;
    setVal((pre) => ({
      ...pre,
      text: value,
      height: fontSize * heightLength,
      width: getTextWidth(e.target.value, fontSize, fontFamily),
    }));
  };

  return (
    <TextAreaCss
      dir="auto"
      onFocus={(e) => {
        e.target.select();
      }}
      autoFocus
      tabIndex={0}
      value={val.text}
      style={computed}
      className="a1TextArea"
      onBlur={onBlurHandle}
      autoCorrect="off"
      spellCheck="false"
      onChange={onChangeHandle}
    ></TextAreaCss>
  );
};

const TextAreaCss = styled.textarea`
  position: absolute;
  display: block;
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
  vertical-align: text-top;
  color: rgb(30, 30, 30);
  opacity: 1;
  border:1px solid transparent;
  /* filter: var(--theme-filter); */
  /* max-height: 1602.7px; */
`;
