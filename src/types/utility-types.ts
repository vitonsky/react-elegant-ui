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
// export type ComplexUnionToIntersection<U> = { o: U } extends { o: infer X }
// 	? {
// 			[K in keyof (X & U)]: (X & U)[K];
// 	  }
// 	: UnionToIntersection<U>;

// Info: https://stackoverflow.com/a/67577722/18680275
type Intersection<A, B> = A & B extends infer U
	? { [P in keyof U]: U[P] }
	: never;

type Matching<T, SomeInterface> = {
	[K in keyof T]: SomeInterface extends T[K] ? K : never;
}[keyof T];

type NonMatching<T, SomeInterface> = {
	[K in keyof T]: SomeInterface extends T[K] ? never : K;
}[keyof T];

type AllKeys<T> = T extends unknown ? keyof T : never;
type Idx<T, K extends PropertyKey> = T extends unknown
	? K extends keyof T
		? T[K]
		: never
	: never;
type ConditionalOptional<T> = Intersection<
	Partial<Pick<T, Matching<T, undefined>>>,
	Required<Pick<T, NonMatching<T, undefined>>>
>;

// Info: https://stackoverflow.com/questions/71717475/how-to-make-one-object-type-which-will-contain-properties-of-all-objects-of-unio?noredirect=1#comment126744150_71717475
export type ComplexUnionToIntersection<T> = ConditionalOptional<{
	[K in AllKeys<T>]: Idx<T, K>;
}>;
export type UnionToIntersectionDeep<U> = {
	[K in keyof ComplexUnionToIntersection<U>]: ComplexUnionToIntersection<
		ComplexUnionToIntersection<U>[K]
	>;
};
