import {
	Instance,
	Modifier,
	OptionsGeneric,
	State,
	VirtualElement,
} from '@popperjs/core';
import { CSSProperties, RefObject } from 'react';

import { DeepReadonly } from '../../../types/utility-types';

export type Boundary = RefObject<HTMLElement> | Array<RefObject<HTMLElement>>;

export type PopperConstructor = <TModifier extends Partial<Modifier<any, any>>>(
	reference: Element | VirtualElement,
	popper: HTMLElement,
	options?: Partial<OptionsGeneric<TModifier>>,
) => Instance;

export type PopperPublicState = {
	attributes?: Partial<State['attributes']>;
	styles?: Partial<Record<keyof State['elements'], Partial<CSSProperties>>>;
};

/**
 * Type for handler who will set new state
 */
export type SetStateHook = (obj: DeepReadonly<PopperPublicState>) => void;

/**
 * Type for handler who will update state partial
 *
 * This handler should merge data with current state
 */
// TODO: add `UpdateStateHook`

/**
 * Helper type to define format of modifier storage property
 */
export type ModifierStorage<ModName extends string, T = any> = {
	[K in `__${ModName}`]: T;
};

/**
 * Patch for `state` who add property for keep modifier data permanently
 *
 * Different of `modifiersData` property, this never rewrite automatically
 */
export type StateWithModifierStorage<ModName extends string, T = any> = State &
	ModifierStorage<ModName, T>;
