/**
 * Return new object which is copy and haven't specified properties
 */
export const excludeProps = <T extends Record<string, any>>(
	object: T,
	props: string[],
): Exclude<T, keyof typeof props> => {
	const newProps = { ...object } as Exclude<T, keyof typeof props>;

	props.forEach((name) => {
		delete newProps[name];
	});

	return newProps;
};
