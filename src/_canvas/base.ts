import { createId } from "./helper";
import { EventNames, Listener, Shape } from "./types";

export default class CanvasB implements Shape {
  private listeners: { [eventName: string]: Listener[] };
  public id: string;
  constructor() {
    this.id = createId();
    this.listeners = {};
  }

  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("error");
  }

  on(eventName: EventNames, listener: Listener): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(listener);
    } else {
      this.listeners[eventName] = [listener];
    }
  }

  getId(): string {
    return this.id;
  }

  getListeners(): { [name: string]: Listener[] } {
    return this.listeners;
  }
  createText() {}
}
