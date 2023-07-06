import fs from 'node:fs/promises';
import { IPCIO } from '@ipc/io';
import { Handler, Module } from '../utils/decorators';

@Module('io')
export default class IO implements IPCIO {
  @Handler('read')
  async read(
    filename: string,
    position: number,
    length: number,
  ): Promise<Buffer> {
    const fd = await fs.open(filename);
    const buffer = Buffer.alloc(length);
    await fd.read({ buffer, position, length });

    await fd.close();
    return buffer;
  }

  @Handler('size')
  async size(filename: string) {
    const fd = await fs.open(filename);
    const { size } = await fd.stat({ bigint: true });

    return size;
  }
}
