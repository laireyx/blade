import { ipcMain } from 'electron';
import 'reflect-metadata';

const propIpcHandlers = Symbol('ipc-handlers');

type HandlerList = Map<string, (...args: any[]) => Promise<any>>;

export function Module(moduleName: string) {
  return function <T extends { new (): object }>(constructor: T) {
    const ipcHandlers: HandlerList = Reflect.getMetadata(
      propIpcHandlers,
      constructor,
    );

    for (const [messageName, handler] of ipcHandlers.entries()) {
      console.log(`${moduleName}:${messageName}`);
      ipcMain.handle(`${moduleName}:${messageName}`, (_, ...args: any[]) =>
        handler(...args),
      );
    }
  };
}

export function Handler(messageName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const ipcHandlers: HandlerList =
      Reflect.getMetadata(propIpcHandlers, target) ?? new Map();

    ipcHandlers.set(messageName, descriptor.value);
    console.log(target, ipcHandlers);

    Reflect.deleteMetadata(propIpcHandlers, target);
    Reflect.defineMetadata(propIpcHandlers, ipcHandlers, target);
  };
}
