export interface Shape {
    draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D): void;
  
    on(name: string, listener: Listener): void;
  
    getListeners(): { [name: string]: Listener[] };
  
    getId(): string;
  }
  
  export interface Listener {
    (evt: MouseEvent,id: string): void;
  }
  
  export enum EventNames {
    click = 'click',
    mousedown = 'mousedown',
    mousemove = 'mousemove',
    mouseup = 'mouseup',
    mouseenter = 'mouseenter',
    mouseleave = 'mouseleave',
  }


  export type Pos = {
    x:number
    y:number
  }


  export type Vec2 = [number,number];
