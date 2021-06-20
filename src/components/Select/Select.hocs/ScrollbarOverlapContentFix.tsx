import React, {
	CSSProperties,
	useEffect,
	useState,
	ComponentType,
	FC,
	useRef,
	useContext,
	useMemo,
} from 'react';

import { canUseDOM } from '../../../lib/canUseDOM';
import { getDisplayName } from '../../../lib/getDisplayName';
import { mergeProps } from '../../../lib/merge';
import { overflowAutoFix } from '../../../polyfills/overflowAutoFix';

import { ISelectDesktopProps } from '../Select@desktop';
import { SelectListContext } from '../List/Select-List';

/**
 * HOC to fix scrollbar overlaping while use `scroll: auto` in firefox
 *
 * Original bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1424328
 */
export const ScrollbarOverlapContentFix = <P extends {}>(
	// WARNING: any object type
	BaseComponent: ComponentType,
) => {
	const WrappedComponent: FC<P & ISelectDesktopProps> = (props) => {
		const { opened } = props;

		const listboxRef = useRef<HTMLDivElement>(null);
		const [listStyles, setListStyles] = useState<CSSProperties>();

		useEffect(() => {
			if (!opened || listboxRef.current === null) {
				return;
			}

			// Observe resize and fix indents
			const cancel = overflowAutoFix(listboxRef.current, ({ x }) => {
				setListStyles({
					paddingInlineEnd: x ? x + 'px' : undefined,
				});
			});

			return () => {
				cancel();
				setListStyles({});
			};
		}, [opened, setListStyles]);

		// Inject props to list
		const SelectListContextObj = useContext(SelectListContext);
		const SelectListContextMix = useMemo(
			() =>
				mergeProps(SelectListContextObj, {
					style: listStyles,
					innerRef: listboxRef,
				}),
			[SelectListContextObj, listStyles, listboxRef],
		);

		return (
			<SelectListContext.Provider value={SelectListContextMix}>
				<BaseComponent {...props} />
			</SelectListContext.Provider>
		);
	};

	WrappedComponent.displayName = `ScrollbarOverlapContentFix(${getDisplayName(
		BaseComponent,
	)})`;

	return WrappedComponent;
};

// TODO: test it in safari
/**
 * Isomorphic `ScrollbarOverlapContentFix`
 *
 * It will auto enable in browsers who have this bug
 *
 * WARNING: if you use SSR, you should use your own manager which decide use HOC or not depends of user agent
 */
export const ScrollbarOverlapContentFixIsomorphic = <P extends {}>(
	BaseComponent: ComponentType,
): ComponentType<P & ISelectDesktopProps> => {
	const isNeedFix = canUseDOM()
		? navigator.userAgent.match(/firefox/i)
		: false;

	if (!isNeedFix) {
		return BaseComponent as ComponentType<P & ISelectDesktopProps>;
	}

	return ScrollbarOverlapContentFix(BaseComponent);
};
