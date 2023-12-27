// render select

import Text from "../shapes/text";

const POINT_SIZE = 8;
const POINT_SIZE_OFFSET = POINT_SIZE / 2
export const renderSelect = (ctx: CanvasRenderingContext2D, osCtx:OffscreenCanvasRenderingContext2D, data: Text) => {
  const _data = data.getElementData();
  const { width:_w, height:_h, x, y, angle,scale  } = _data;
  let width = _w * scale[0];
  let height = _h * scale[1];
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.save();
  ctx.translate(x + width/2,y + height/2);
  ctx.rotate(angle);
  // ctx.scale(scale[0],scale[1])
  ctx.beginPath();
  ctx.strokeStyle = "rgb(29,128,255)";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.rect(-width/2, -height/2, width, height);
  ctx.stroke();

  //绘制四个点
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(0 - POINT_SIZE_OFFSET -width/2, 0 - POINT_SIZE_OFFSET -height/2, POINT_SIZE, POINT_SIZE, 1);
  ctx.fill();
  ctx.stroke();
  

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(0 + width/2 - POINT_SIZE_OFFSET, 0 - POINT_SIZE_OFFSET -height/2, POINT_SIZE, POINT_SIZE,1);
  ctx.fill();
  ctx.stroke();
  

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(0 + width/2 - POINT_SIZE_OFFSET, 0 + height/2 - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  ctx.fill();
  ctx.stroke();
  

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.roundRect(0 - POINT_SIZE_OFFSET -width/2, 0 + height/2 - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};
