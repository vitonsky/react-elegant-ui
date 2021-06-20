import path from 'path';

import { promises, BaseEncodingOptions, Mode, OpenMode } from 'fs';
const { mkdir, writeFile } = promises;

/**
 * Check that `str2` is substring of `str1`
 */
export const isSubstring = (str1: string, str2: string) =>
	str2.slice(0, str1.length) === str1;

export const isLocalPath = (path: string) => /^(?!\/|[a-z]+:\/\/|#)/.test(path);

export const normalizePath = (filename: string) => {
	const normalized = path
		.normalize(filename)
		.replace(/\\/g, '/')
		.replace(/\/{2,}/g, '/');
	return normalized;
};

export const convertToAbsPath = (filename: string) =>
	path.resolve(process.cwd(), filename);

/**
 * Work like `writeFile` but create directory recursively if not exist
 */
export const writeFileForce = async (
	filePath: string,
	data: string | Uint8Array,
	options?:
		| (BaseEncodingOptions & { mode?: Mode; flag?: OpenMode })
		| BufferEncoding
		| null,
): Promise<void> => {
	await mkdir(path.dirname(filePath), { recursive: true });
	return writeFile(filePath, data, options);
};
