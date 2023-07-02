import { glob } from 'glob';
import { exposeModule, registerModule } from './utils/bridge';
import { ContextBridge, IpcRenderer } from 'electron';

export async function registerModules() {
  const moduleNames = await glob('modules/**/*.js', { cwd: __dirname });

  for (const filename of moduleNames) {
    const Module = await import('./' + filename).then(
      (imported) => imported.default.default,
    );

    registerModule(Module);
  }
}

// Should be synchronous because we cannot use top-level await in preload
// (tsc recognizes preload script as commonjs module)
export function exposeModules(
  contextBridge: ContextBridge,
  ipcRenderer: IpcRenderer,
) {
  const moduleNames = glob.sync('modules/**/*.js', { cwd: __dirname });

  for (const filename of moduleNames) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Module = require('./' + filename).default;

    exposeModule(Module, contextBridge, ipcRenderer);
  }
}
