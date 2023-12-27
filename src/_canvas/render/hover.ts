// render select

import Text from "../shapes/text";

const POINT_SIZE = 8;
const POINT_SIZE_OFFSET = POINT_SIZE / 2;
export const renderHover = (ctx: CanvasRenderingContext2D, data: Text) => {
  const _data = data.getElementData();
  const { width, height, x, y, angle } = _data;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = "rgb(29,128,255)";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.translate(x + width/2,y+height/2);
  ctx.rotate(angle);
  ctx.rect(-width/2, -height/2, width, height);
  ctx.stroke();
  ctx.restore();
};
