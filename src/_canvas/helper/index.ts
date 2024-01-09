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

let cacheId = '';
let cacheElement:any = undefined;
export function getElementById(
  element: AElementType[],
  id: string,
  cb?: (element: AElementType) => void
): AElementType | undefined {
  if(element.length> 0){
    cb && cb(element[0])
    return element[0]
  }
  // if(cacheId === id && cacheElement) return cacheElement;
  // let index = element.findIndex((item) => item.id === id);
  // if (index === undefined) return undefined;
  // cb && cb(element[index]);
  // cacheId = cacheElement;
  // cacheElement = element[index];
  // return element[index];
}
