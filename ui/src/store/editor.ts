import { create } from 'zustand';

interface EditorInterface {
  filename: string;
  line: number;
  offset: number;
  BLOCK_SIZE: number;
  encoding: string;

  str: string;

  open: (filename: string) => Promise<void>;
  read: () => Promise<void>;
}

const useEditor = create<EditorInterface>((set, get) => ({
  filename: 'package.json',
  line: 1,
  offset: 0,
  BLOCK_SIZE: 4096,
  encoding: 'utf-8',

  str: '',

  open: async (filename: string) => {
    const { BLOCK_SIZE, encoding } = get();
    const data = await io.read(filename, 0, BLOCK_SIZE);
    const str = new TextDecoder(encoding).decode(data);

    set({
      filename,
      line: 1,
      offset: 0,
      str,
    });
  },

  read: async () => {
    const { filename, offset, BLOCK_SIZE, encoding } = get();
    const data = await io.read(filename, offset, BLOCK_SIZE);
    const str = new TextDecoder(encoding).decode(data);

    set({ str });
  },
}));

export default useEditor;
