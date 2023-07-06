export interface IPCIO {
  read(filename: string, position: number, length: number): Promise<Buffer>;
  size(filename: string): Promise<BigInt>;
}
