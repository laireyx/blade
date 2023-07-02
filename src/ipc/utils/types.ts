import { propModuleName } from './symbols';

export abstract class DecoratedModule {
  static [propModuleName]: string;
}

export type HandlerList = Map<string, (...args: any[]) => Promise<any>>;
