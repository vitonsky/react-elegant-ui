import path from 'path';

export const staticDir = 'static';
export const filesDir = staticDir + '/files';

export const filesDirRel = filesDir;
export const filesDirAbs = path.resolve(process.cwd(), 'public', filesDirRel);
