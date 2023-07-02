import { contextBridge, ipcRenderer } from 'electron';
import { exposeModules } from '../ipc';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

// Cannot use top-level await due to tsc reason
exposeModules(contextBridge, ipcRenderer);
