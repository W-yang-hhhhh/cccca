import { AElementType } from "../types/element";
export function idToRgba(id: string) {
  return id.split("-");
}

export function rgbaToId(rgba: [number, number, number, number]) {
  return rgba.join("-");
}

const idPool: any = {};

export function createId(): string {
  let id = createOnceId();

  while (idPool[id]) {
    id = createOnceId();
  }

  return id;
}

function createOnceId(): string {
  return Array(3)
    .fill(0)
    .map(() => Math.ceil(Math.random() * 255))
    .concat(255)
    .join("-");
}

export function getElementById(
  element: AElementType[],
  id: string,
  cb?: (element: AElementType) => void
): AElementType | undefined {
  let index = element.findIndex((item) => item.id === id);
  if (index === undefined) return undefined;
  cb && cb(element[index]);

  return element[index];
}
