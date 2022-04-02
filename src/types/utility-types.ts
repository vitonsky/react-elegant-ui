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
