

    //获取文本宽度
export const getTextWidth = (ctx:OffscreenCanvasRenderingContext2D,text:string,fontSize:number,fontFamily:string)=>{
    ctx.font = `${fontSize}px ${fontFamily}`
    const _w = ctx.measureText(text).width;
    return _w;
}


