import { glob } from 'glob';

export default async function registerHandlers() {
  const modules = await glob('modules/**/*.js', { cwd: __dirname });

  for (const filename of modules) {
    await import('./' + filename);
  }
}
