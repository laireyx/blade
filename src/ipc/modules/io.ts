import fs from 'node:fs/promises';
import { Handler, Module } from '../utils/decorators';

@Module('io')
export default class IO {
  @Handler('read')
  static async read(
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
}
