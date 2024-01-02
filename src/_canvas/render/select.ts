// render select

import Text from "../shapes/text";

const POINT_SIZE = 8;
const POINT_SIZE_OFFSET = POINT_SIZE / 2
export const renderSelect = (ctx: CanvasRenderingContext2D, osCtx:OffscreenCanvasRenderingContext2D, data: Text) => {
  const _data = data.getElementData();
  const { width, height, x, y, angle, scale, hidden  } = _data;
  if(hidden) return ;
  // let width = _w * scale[0];
  // let height = _h * scale[1];
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





  ///////*************OffScreenCanvas Render *************//////////
  osCtx.save();
  osCtx.translate(x + width/2,y + height/2);
  osCtx.rotate(angle);


  /////绘制旋转区域
  osCtx.strokeStyle = "rgba(4,4,4,1)";
  osCtx.fillStyle = "rgba(4,4,4,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 - POINT_SIZE * 1.5 -width/2, 0 - POINT_SIZE * 1.5 -height / 2, POINT_SIZE*2, POINT_SIZE*2, 1);
  osCtx.fill();
  osCtx.stroke();
  
  osCtx.strokeStyle = "rgba(5,5,5,1)";
  osCtx.fillStyle = "rgba(5,5,5,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 + width/2 - POINT_SIZE_OFFSET, 0 - POINT_SIZE*1.5 -height/2, POINT_SIZE*2, POINT_SIZE*2,1);
  osCtx.fill();
  osCtx.stroke();
  
  osCtx.strokeStyle = "rgba(6,6,6,1)";
  osCtx.fillStyle = "rgba(6,6,6,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 + width/2 - POINT_SIZE_OFFSET, 0 + height/2 - POINT_SIZE_OFFSET, POINT_SIZE*2, POINT_SIZE*2,1);
  osCtx.fill();
  osCtx.stroke();
  
  osCtx.strokeStyle = "rgba(7,7,7,1)";
  osCtx.fillStyle = "rgba(7,7,7,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 - POINT_SIZE*1.5 -width/2, 0 + height/2 - POINT_SIZE_OFFSET, POINT_SIZE*2, POINT_SIZE*2,1);
  osCtx.fill();
  osCtx.stroke();



  /////绘制拖拽区域
  osCtx.strokeStyle = "rgba(0,0,0,1)";
  osCtx.fillStyle = "rgba(0,0,0,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 - POINT_SIZE_OFFSET -width/2, 0 - POINT_SIZE_OFFSET -height/2, POINT_SIZE, POINT_SIZE, 1);
  osCtx.fill();
  osCtx.stroke();
  
  osCtx.strokeStyle = "rgba(1,1,1,1)";
  osCtx.fillStyle = "rgba(1,1,1,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 + width/2 - POINT_SIZE_OFFSET, 0 - POINT_SIZE_OFFSET -height/2, POINT_SIZE, POINT_SIZE,1);
  osCtx.fill();
  osCtx.stroke();
  
  osCtx.strokeStyle = "rgba(2,2,2,1)";
  osCtx.fillStyle = "rgba(2,2,2,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 + width/2 - POINT_SIZE_OFFSET, 0 + height/2 - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  osCtx.fill();
  osCtx.stroke();
  
  osCtx.strokeStyle = "rgba(3,3,3,1)";
  osCtx.fillStyle = "rgba(3,3,3,1)";
  osCtx.beginPath();
  osCtx.lineWidth = 2;
  osCtx.roundRect(0 - POINT_SIZE_OFFSET -width/2, 0 + height/2 - POINT_SIZE_OFFSET, POINT_SIZE, POINT_SIZE,1);
  osCtx.fill();
  osCtx.stroke();

  osCtx.restore();
};
