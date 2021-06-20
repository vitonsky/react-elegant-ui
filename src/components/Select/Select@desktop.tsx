import React, {
	ComponentType,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { PressEvent } from '@react-types/shared';
import { useComponentRegistry } from '@bem-react/di';

import { makeChain } from '../../lib/makeChain';
import { Keys, isKeyCode } from '../../lib/keyboard';
import { mergeProps } from '../../lib/merge';
import { getDisplayName } from '../../lib/getDisplayName';
import { useRefMix } from '../../hooks/useRefMix';
import { useToggleable } from '../../hooks/behavior/useToggleable';

import { ISelectDesktopRegistry } from './Select.registry/desktop';
import { ISelectProps, cnSelect, Select as BaseSelect } from './Select';
import { SelectTriggerContext } from './Trigger/Select-Trigger';
import { ISelectPopup } from './Popup/Select-Popup';

export * from './Select';

export interface ISelectDesktopProps extends ISelectProps {
	/**
	 * Don't close after choose in single mode
	 */
	nocollapse?: boolean;

	/**
	 * Content before menu
	 */
	addonBeforeMenu?: ReactNode;

	/**
	 * Content after menu
	 */
	addonAfterMenu?: ReactNode;
}

/**
 * Implementation of select for desktop
 *
 * It implement as HOC to allow use any `BaseSelect` implementation
 */
const withDesktopSelect =
	(BaseSelect: ComponentType<ISelectProps>): FC<ISelectDesktopProps> =>
		({ nocollapse, addonBeforeMenu, addonAfterMenu, ...props }) => {
			const {
				options,
				value,
				opened,
				disabled,
				addonAfter,
				innerRef,
				triggerRef: triggerRefExternal,
				setValue,
				setOpened: setOpenedExternal,
			} = props;

			const isMultiple = Array.isArray(value);
			const pickKeys = useMemo(() => [Keys.ENTER, Keys.SPACE], []);

			// Nodes refs
			const selectRef = useRef<HTMLElement>(null);
			const triggerRef = useRef<HTMLElement>(null);

			// Opened state management
			const { toggle: toggleOpened, setState: setOpened } = useToggleable({
				state: opened,
				setState: setOpenedExternal,
			});

			// Value setter
			const setValueProxy = useCallback(
				(value?: string | string[]) => {
					if (setValue !== undefined) {
						setValue(value);
					}
				},
				[setValue],
			);

			// Enable ignore keyboard press events for trigger while listbox is open
			const pressLock = useRef(false);

			// It should be disabled only by keyup or blur event on press key
			const disablePressLock = useCallback(
				(force?: boolean) => {
				// Never unlock for multiple type. User must close it by escape
					if (force || !isMultiple) {
						pressLock.current = false;
					}
				},
				[isMultiple],
			);

			const updatePressLock = useCallback(() => {
				if (opened) {
					pressLock.current = true;
				}
			}, [opened]);

			useEffect(updatePressLock, [updatePressLock]);

			// Focus to trigger by close
			const focusToTrigger = useRef(false);
			useEffect(() => {
				if (
					!opened &&
				focusToTrigger.current &&
				triggerRef.current !== null
				) {
					triggerRef.current.focus();
				}

				focusToTrigger.current = false;
			}, [opened]);

			// Close by pick when type is not multiple
			const onPick = useCallback(() => {
				if (!isMultiple && !nocollapse) {
					focusToTrigger.current = true;
					setOpened(false);
				}
			}, [isMultiple, nocollapse, setOpened]);

			// Handle close event
			const onCloseHandler: ISelectPopup['onClose'] = useCallback(
				(_, source) => {
					focusToTrigger.current = source === 'esc';
					disablePressLock(true);
					setOpened(false);
				},
				[disablePressLock, setOpened],
			);

			// Set handler for close by unfocus
			// NOTE: actually by focus on other elements, but maybe should handle blur?
			useEffect(() => {
				if (selectRef.current === null || !opened || disabled) return;

				const hostNode = selectRef.current;
				const rootNode = hostNode.getRootNode();
				const shadowHost =
				rootNode instanceof ShadowRoot ? rootNode.host : null;

				// Close when focus outside root of component
				const closeByFocusOutside = (evt: Event) => {
				// Skip empty target
					if (!(evt.target instanceof Node)) return;

					// Skip global event while target is ShadowRoot
					// It will handle in next call and target will contain real node, instead ShadowRoot host
					if (shadowHost !== null && evt.target === shadowHost) return;

					if (!hostNode.contains(evt.target)) {
						setOpened(false);
					}
				};

				// Add global handler
				document.addEventListener('focusin', closeByFocusOutside);

				// Add handler for ShadowRoot for work even with `mode: close`
				if (shadowHost !== null) {
					rootNode.addEventListener('focusin', closeByFocusOutside);
				}

				return () => {
					document.removeEventListener('focusin', closeByFocusOutside);

					if (shadowHost !== null) {
						rootNode.addEventListener('focusin', closeByFocusOutside);
					}
				};
			}, [opened, disabled, setOpened, disablePressLock]);

			// Toggle by press
			const onPressHandler = useCallback(
				(evt: PressEvent) => {
				// Skip synthetic press event (by enter only) due to focus after press
					if (evt.pointerType === 'virtual') return;

					toggleOpened();
				},
				[toggleOpened],
			);

			// Toggle by keyboard
			const onKeyDownHandler = useCallback(
				(evt: React.KeyboardEvent<HTMLElement>) => {
					if (disabled) return;

					if (isKeyCode(evt.key, [Keys.UP, Keys.DOWN])) {
					// Prevent scroll of parent
						evt.preventDefault();

						// Toggle by release key
						if (evt.type === 'keyup') {
							setOpened(true);
						}
					} else if (isKeyCode(evt.nativeEvent.code, pickKeys)) {
					// Prevent keyboard events while key is down and until keyup or blur events
						if (evt.type === 'keydown' && pressLock.current) {
							evt.stopPropagation();
						} else if (evt.type === 'keyup') {
							disablePressLock();
						}
					}
				},
				[disablePressLock, disabled, pickKeys, setOpened],
			);

			const [cursorIdRef, cursorIdRefSet] = useState<string | null>();
			const cursorNodeId = opened ? cursorIdRef ?? undefined : undefined;

			// Inject props to `Trigger`
			const SelectTriggerCtxObj = useContext(SelectTriggerContext);
			const {
				onKeyDownCapture,
				onKeyUpCapture,
				onBlurCapture,
				onFocusCapture,
			} = SelectTriggerCtxObj;
			const SelectTriggerContextMix = useMemo(
				() =>
					mergeProps(SelectTriggerCtxObj, {
						'aria-activedescendant': cursorNodeId,
						onPress: onPressHandler,
						onKeyDownCapture: makeChain(
							onKeyDownHandler,
							onKeyDownCapture,
						),
						onKeyUpCapture: makeChain(onKeyDownHandler, onKeyUpCapture),
						// Force disable pressLock while blur
						onBlurCapture: makeChain(() => {
							disablePressLock(true);
						}, onBlurCapture),
						// Restore pressLock after focus on inner elements
						onFocusCapture: makeChain(updatePressLock, onFocusCapture),
					}),
				[
					SelectTriggerCtxObj,
					cursorNodeId,
					onPressHandler,
					onKeyDownHandler,
					onKeyDownCapture,
					onKeyUpCapture,
					onBlurCapture,
					updatePressLock,
					onFocusCapture,
					disablePressLock,
				],
			);

			// Ref mixes
			const innerRefMix = useRefMix(selectRef, innerRef);
			const triggerRefMix = useRefMix(triggerRef, triggerRefExternal);

			// Get deps components
			const { List, Popup } = useComponentRegistry<ISelectDesktopRegistry>(
				cnSelect(),
			);

			// TODO: check acessability, maybe need bind menu to button by `id`
			return (
				<SelectTriggerContext.Provider value={SelectTriggerContextMix}>
					<BaseSelect
						{...props}
						options={options}
						value={value}
						opened={opened}
						disabled={disabled}
						innerRef={innerRefMix}
						triggerRef={triggerRefMix}
						addonAfter={
							<>
								<Popup
									target="anchor"
									anchor={selectRef}
									visible={opened}
									onClose={onCloseHandler}
								>
									{addonBeforeMenu}
									<List
										visible={opened}
										type={isMultiple ? 'checkbox' : 'radio'}
										disabled={disabled}
										isFocused={opened}
										items={options}
										value={value}
										setValue={setValueProxy}
										pickKeys={pickKeys}
										onPick={onPick}
										cursorIdRef={cursorIdRefSet}
									// pickStrategy="keyup"
									/>
									{addonAfterMenu}
								</Popup>
								{addonAfter}
							</>
						}
					/>
				</SelectTriggerContext.Provider>
			);
		};

export const Select = withDesktopSelect(BaseSelect);

Select.displayName = getDisplayName(BaseSelect);
