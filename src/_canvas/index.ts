import { rgbaToId } from "./helper";
import EventSimulator, { ActionType } from "./eventSimulator";
import Text from "./shapes/text";
import { renderSelect } from "./render/select";
import { elementType } from "./types/element";
import { getTextWidth } from "./helper/text";
import { canvasGlobalMouseEventHandle } from "./event/mouseEvent";
import { renderHover } from "./render/hover";

export default class Stage {
  private canvas: HTMLCanvasElement;
  private osCanvas: OffscreenCanvas;
  public ctx: CanvasRenderingContext2D;
  private osCtx: OffscreenCanvasRenderingContext2D;
  private elements: any[];
  private dpr: number;
  private eventSimulator: EventSimulator;
  private shapes: Set<string>;
  public currentSelectId: string;
  private currentHoverId: string;
  private isMouseDown: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.elements = [];
    this.dpr = window.devicePixelRatio;

    canvas.width = parseInt(canvas.style.width) * this.dpr;
    canvas.height = parseInt(canvas.style.height) * this.dpr;

    this.osCanvas = new OffscreenCanvas(canvas.width, canvas.height);

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.osCtx = this.osCanvas.getContext(
      "2d"
    ) as OffscreenCanvasRenderingContext2D;

    this.ctx.scale(this.dpr, this.dpr);
    this.osCtx.scale(this.dpr, this.dpr);

    this.canvas.addEventListener(
      "mousedown",
      this.handleCreator(ActionType.Down)
    );
    this.canvas.addEventListener("mouseup", this.handleCreator(ActionType.Up));
    this.canvas.addEventListener(
      "mousemove",
      this.handleCreator(ActionType.Move)
    );
    this.canvas.addEventListener(
      "mouseenter",
      this.handleCreator(ActionType.Enter)
    );
    this.canvas.addEventListener(
      "mouseout",
      this.handleCreator(ActionType.Leave)
    );

    this.shapes = new Set();
    this.eventSimulator = new EventSimulator();
    this.currentSelectId = "";
    this.currentHoverId = "";
    this.isMouseDown = false;

    this.shapes.add('0-0-0-255');
    this.shapes.add('1-1-1-255')
    this.shapes.add('2-2-2-255')
    this.shapes.add('3-3-3-255')
    this.shapes.add('4-4-4-255')
    this.shapes.add('5-5-5-255')
    this.shapes.add('6-6-6-255')
    this.shapes.add('7-7-7-255')
  }
  //鼠标事件
  handleCreator = (type: ActionType) => (evt: MouseEvent) => {
    const x = evt.offsetX;
    const y = evt.offsetY;

    let id = this.hitJudge(x, y);

    if (id) {
      this.eventSimulator.addAction({ type, id }, evt);
    }

    this.currentHoverId = id || "";

    canvasGlobalMouseEventHandle.call(this, evt, type, id, this.elements);
  };

  private hitJudge(x: number, y: number): string | undefined {
    const rgba = Array.from(
      this.osCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data
    );

    const id = rgbaToId(rgba as [number, number, number, number]);
    
    return this.shapes.has(id) ? id : undefined;
  }

  add(element: Text) {
    const textData = element.getElementData();
    //deal text
    if (textData.elementType === elementType.text) {
      //初始化 w&h
      const _w = getTextWidth(
        this.osCtx,
        textData.text,
        textData.fontSize,
        textData.fontFamily
      );
      element.changeProperty({
        width: _w,
        height: textData.fontSize,
      });
    }

    //common
    const id = element.getId();
    this.eventSimulator.addListeners(id, element.getListeners());
    this.elements.push(element);
    this.shapes.add(id);
    this.currentSelectId = id;
  }

  change(id: string, property: any) {
    let currentIndex = this.elements.findIndex((item) => item.id === id);
    this.elements[currentIndex].changeProperty(property);
  }

  delete(id: string) {
    ///delete Element;
  }

  getCurrentSelectId() {
    return this.currentSelectId;
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.osCtx.clearRect(0, 0, this.osCtx.canvas.width, this.osCtx.canvas.height);
    this.elements.map((item) => {
      
      //渲染选中框
      if (item.id === this.currentSelectId) {
        renderSelect(this.ctx,this.osCtx, item);
      }
      
      //渲染Hover
      if (
        item.id === this.currentHoverId &&
        this.currentHoverId !== this.currentSelectId
      ) {
        renderHover(this.ctx, item);
      }
      
      item?.draw(this.ctx, this.osCtx);
    });
  }

  renderLoop() {
    let timerId = undefined;
    const scheduleFunc = () => {
      timerId = window.requestAnimationFrame(() => {
        this.render();
        scheduleFunc();
      });
    };

    scheduleFunc();
  }
}
