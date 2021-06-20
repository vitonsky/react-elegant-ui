// Generated utility types to merge many object types to one object type
// which props contains a union of all objects props types

import { GetProperty } from './utility-types';

// TODO: make extension for editor to generate reloads by template
// To generate just run this:
// Array(10)
// 	.fill(1)
// 	.map((_, idx) => {
// 		const num = idx + 1;
// 		const elms = Array(num).fill(1);
// 		const Types = elms.map((_, id) => 'T' + (id + 1));
// 		return `export type DeepUnion${num}<${Types.join(
// 			', ',
// 		)}> = {[P in keyof (${Types.join(' & ')})]: ${Types.map(
// 			(T) => `GetProperty<${T}, P>`,
// 		).join(' | ')}};`;
// 	})
// 	.slice(1)
// 	.join('\n');

export type DeepUnion2<T1, T2> = {
	[P in keyof (T1 & T2)]: GetProperty<T1, P> | GetProperty<T2, P>;
};
export type DeepUnion3<T1, T2, T3> = {
	[P in keyof (T1 & T2 & T3)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>;
};
export type DeepUnion4<T1, T2, T3, T4> = {
	[P in keyof (T1 & T2 & T3 & T4)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>;
};
export type DeepUnion5<T1, T2, T3, T4, T5> = {
	[P in keyof (T1 & T2 & T3 & T4 & T5)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>
		| GetProperty<T5, P>;
};
export type DeepUnion6<T1, T2, T3, T4, T5, T6> = {
	[P in keyof (T1 & T2 & T3 & T4 & T5 & T6)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>
		| GetProperty<T5, P>
		| GetProperty<T6, P>;
};
export type DeepUnion7<T1, T2, T3, T4, T5, T6, T7> = {
	[P in keyof (T1 & T2 & T3 & T4 & T5 & T6 & T7)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>
		| GetProperty<T5, P>
		| GetProperty<T6, P>
		| GetProperty<T7, P>;
};
export type DeepUnion8<T1, T2, T3, T4, T5, T6, T7, T8> = {
	[P in keyof (T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>
		| GetProperty<T5, P>
		| GetProperty<T6, P>
		| GetProperty<T7, P>
		| GetProperty<T8, P>;
};
export type DeepUnion9<T1, T2, T3, T4, T5, T6, T7, T8, T9> = {
	[P in keyof (T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>
		| GetProperty<T5, P>
		| GetProperty<T6, P>
		| GetProperty<T7, P>
		| GetProperty<T8, P>
		| GetProperty<T9, P>;
};
export type DeepUnion10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> = {
	[P in keyof (T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10)]:
		| GetProperty<T1, P>
		| GetProperty<T2, P>
		| GetProperty<T3, P>
		| GetProperty<T4, P>
		| GetProperty<T5, P>
		| GetProperty<T6, P>
		| GetProperty<T7, P>
		| GetProperty<T8, P>
		| GetProperty<T9, P>
		| GetProperty<T10, P>;
};
