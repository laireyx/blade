import { create } from 'zustand';

interface EditorInterface {
  filename: string;
  line: number;
  offset: number;
  data: Uint8Array;

  read: () => Promise<void>;
}

declare global {
  const io: {
    read: (
      filename: string,
      position: number,
      length: number,
    ) => Promise<Buffer>;
  };
}

const useEditor = create<EditorInterface>((set, get) => ({
  filename: 'package.json',
  line: 0,
  offset: 0,
  data: new Uint8Array(),

  read: async () => {
    const { filename, offset } = get();
    const data = await io.read(filename, offset, 4096);
    set({ data });
  },
}));

export default useEditor;
