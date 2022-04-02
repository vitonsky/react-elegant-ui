// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

/**
 * Return type without specified properties.
 *
 * @param T Base type.
 * @param U Properties who should be removed.
 */
export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

/**
 * Return a type who can be null.
 */
export type Nullable<T> = T | null;

/**
 * Return a type who can be undefined.
 */
export type Maybe<T> = T | undefined;

/**
 * Return a type where specified keys is required.
 */
export type Defaultize<T, N extends keyof T> = T & { [P in N]-?: T[P] };

/**
 * Return a type where all keys of object is optionally
 */
export type OptionalKeys<T> = { [P in keyof T]?: T[P] };

/**
 * Return a type where all properties is readonly
 *
 * It useful to prevent mutate object
 */
export type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends {} ? DeepReadonly<T[P]> : T[P];
};

/**
 * Type-safe getting property from else's object by key
 */
export type GetProperty<T, P> = P extends keyof T ? T[P] : never;

/**
 * Make intersection type from union type
 *
 * For more info see: https://fettblog.eu/typescript-union-to-intersection/
 *
 * @example
 * // return `{foo: 1} & {bar: 2}`
 * type intersection = UnionToIntersection<{foo: 1} | {bar: 2}>;
 */
export type UnionToIntersection<U> = (
	U extends any ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never;

// TODO: move to composer library
/**
 * Make intersection type from union type.
 *
 * For objects merge all properties to one object and make intersection types for each one
 *
 * WARNING: this type is under construction, so must not be used outside of library
 */
export type ComplexUnionToIntersection<U> = { o: U } extends { o: infer X }
	? {
			[K in keyof (X & U)]: (X & U)[K];
	  }
	: UnionToIntersection<U>;

// // TODO: result of test case must be `{foo: 1 | 2; bar: 3}`
// type testCase1 = ComplexUnionToIntersection<{ foo: 1 } | { foo: 2; bar: 3 }>;

// // TODO: result of test case must be `{foo: 1 | 2 | 7; bar: 3 | 8}`
// type testCase2 = ComplexUnionToIntersection<
// 	{ foo: 1 } | { foo: 2; bar: 3 } | { foo: 7; bar: 8 }
// >;

// // TODO: result of test case must be `{foo: 1 | 2; bar: 8}`
// type testCase3 = ComplexUnionToIntersection<
// 	{ foo: 1 } | { foo: 2; bar: 3 } | { bar: 8 }
// >;
