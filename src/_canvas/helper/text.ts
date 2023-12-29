

    //获取文本宽度
export const getTextWidth = (text:string,fontSize:number,fontFamily:string)=>{
    let OsCanvas = new OffscreenCanvas(100,100);
    let OsContext = OsCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    OsContext.font = `${fontSize}px ${fontFamily}`;
    const _w = OsContext.measureText(text).width;
    return _w;
}


export const getFonSizeByHeight = (height:number,colNum:number)=>{
    return height/colNum;
}


