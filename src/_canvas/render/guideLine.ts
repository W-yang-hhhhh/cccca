export const renderGuideLine = (
  ctx: CanvasRenderingContext2D,
  renderX: boolean,
  renderY: boolean
) => {
  if (!renderX && !renderY) return;
  let { width: _w, height: _h } = ctx.canvas.style;
  let width = parseInt(_w) as any;
  let height = parseInt(_h) as any;
  ctx.beginPath();
  ctx.strokeStyle = "rgb(255, 139, 107)";
  ctx.lineWidth = 1;

  if (renderX) {
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }
  if (renderY) {
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  }
};
