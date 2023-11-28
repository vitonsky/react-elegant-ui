import { getDisplayName } from '../getDisplayName';
import { CompositeUnit, ConfigurableHOC, HOCOptions } from './types';

/**
 * Check object props to match of pattern
 */
export const isMatchProps = <T>(props: T, pattern: Partial<T>) =>
	(Object.keys(pattern) as (keyof Partial<T>)[]).every(
		(key) => props[key] === pattern[key],
	);

/**
 * Check HOC requirements to match of current props
 */
export const isMatchHOCProps = <T>(
	props: T,
	requirements: Partial<T> | undefined,
) => (requirements === undefined ? true : isMatchProps(props, requirements));

/**
 * Check object structure to match with `ConfigurableHOC`
 */
export const isHOCObject = <T extends {} = any>(
	object: CompositeUnit<T>,
): object is ConfigurableHOC<T> => '__hocOptions' in object;

/**
 * Get array of props from `HOCOptions`
 */
export const getPropsFromHOCOptions = <T extends {}>(
	options: HOCOptions<T>,
	onlyPrivate = false,
) => {
	const propsDict: Record<string, number> = {};

	// Add `matchProps` keys
	const shouldCollectMatchProps = !onlyPrivate || options.privateMatchProps;
	if (shouldCollectMatchProps && options.matchProps !== undefined) {
		Object.keys(options.matchProps).forEach((name) => {
			propsDict[name] = 0;
		});
	}

	// Add `privateProps`
	if (options.privateProps !== undefined) {
		options.privateProps.forEach((name) => {
			propsDict[name] = 0;
		});
	}

	// Add `matchOnlyProps`
	if (options.matchOnlyProps !== undefined) {
		options.matchOnlyProps.forEach((name) => {
			propsDict[name] = 0;
		});
	}

	return Object.keys(propsDict);
};

/**
 * Collect a private props from compose units
 */
export const getPrivatePropsFromComposeUnits = <T extends {} = any>(
	wrappers: CompositeUnit<T>[],
) => {
	// NOTE: #performance use spread + convert to object for merge instead iterate arrays
	const privatePropsDict: Record<string, number> = {};

	// Collect a private props
	wrappers.forEach((wrapper) => {
		// Skip simply HOCs
		if (!isHOCObject(wrapper)) {
			return;
		}

		const options = wrapper.__hocOptions;

		getPropsFromHOCOptions(options, true).forEach((name) => {
			privatePropsDict[name] = 0;
		});
	});

	return privatePropsDict;
};

/**
 * Convert object to string who look as `(key1:value1),(key2:value2)`
 */
export const getObjectHash = (obj: Record<string, any> | undefined) =>
	obj === undefined
		? ''
		: Object.keys(obj)
			.reduce((acc, key) => {
				const value =
						typeof obj[key] === 'function'
							? getDisplayName(obj[key])
							: obj[key];
				acc.push(`${key}:${value}`);
				return acc;
			}, [] as string[])
			.join(',');
