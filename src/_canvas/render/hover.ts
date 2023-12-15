// render select

import Text from "../shapes/text";

const POINT_SIZE = 8;
const POINT_SIZE_OFFSET = POINT_SIZE / 2;
export const renderHover = (ctx: CanvasRenderingContext2D, data: Text) => {
  const _data = data.getTextElementData();
  const { width, height, x, y } = _data;
  ctx.beginPath();
  ctx.strokeStyle = "rgb(29,128,255)";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.rect(x, y, width, height);
  ctx.stroke();
};
