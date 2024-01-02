import { useMemo } from "react";
import styled from "styled-components";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  value: string;
  font: string;
}
export const TextAreaComp = (props: Props) => {
  const { x, y, w, h, angle,value,font } = props;
  const computed = useMemo(() => {
    return {
      width: `${w}px`,
      height: `${h}px`,
      left: `${x}px`,
      top: `${y}px`,
      transform: `rotate(${angle}deg)`,
      font: font
    };
  }, [x, y, w, h]);

  return (
    <TextAreaCss
      dir="auto"
      tabIndex={0}
      value={value}
      style={computed}
      className="a1TextArea"
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
