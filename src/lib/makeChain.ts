type Callback<T extends (...args: any) => any> = (
	...args: Parameters<T>
) => void;

/**
 * Make wrapper which run all callbacks in specified order
 */
export const makeChain = <T extends (...args: any) => any>(
	...callbacks: (undefined | T)[]
): Callback<T> => (...args: any[]) => {
		callbacks.forEach((cb) => {
			if (cb === undefined) return;
			cb(...args);
		});
	};
