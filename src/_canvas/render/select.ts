// render select

import Text from "../shapes/text";

const POINT_SIZE = 8;
const POINT_SIZE_OFFSET = POINT_SIZE / 2
export const renderSelect = (ctx: CanvasRenderingContext2D, osCtx:OffscreenCanvasRenderingContext2D, data: Text) => {
  const _data = data.getTextElementData();
  const { width, height, x, y } = _data;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
  ctx.beginPath();
  ctx.strokeStyle = "rgb(29,128,255)";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.rect(x, y, width, height);
  ctx.stroke();

  //绘制四个点
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(x - POINT_SIZE_OFFSET, y - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE, 1);
  ctx.fill();
  ctx.stroke();
  

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(x + width - POINT_SIZE_OFFSET, y - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  ctx.fill();
  ctx.stroke();
  

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(x + width - POINT_SIZE_OFFSET, y + height - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  ctx.fill();
  ctx.stroke();
  

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(x - POINT_SIZE_OFFSET, y + height - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  ctx.fill();
  ctx.stroke();
};
