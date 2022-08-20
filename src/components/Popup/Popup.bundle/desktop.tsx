import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { PopupDesktopRegistry } from '../Popup.registry/desktop';

// base
import { Popup as PopupDesktop } from '../Popup@desktop';

// _nonvisual
import { withModPopupNonvisual } from '../_nonvisual/Popup_nonvisual';

// _renderAll
import { withModPopupRenderAll } from '../_renderAll/Popup_renderAll';

// _target
import { withModPopupTargetAnchor } from '../_target/Popup_target_anchor';

// _view
import { withModPopupViewDefault } from '../_view/Popup_view_default';

export * from '../Popup@desktop';

export const Popup = compose(
	withModPopupRenderAll,
	withRegistry(PopupDesktopRegistry),
	withModPopupNonvisual,
	withModPopupTargetAnchor,
	composeU(withModPopupViewDefault),
)(PopupDesktop);

Popup.defaultProps = { keepMounted: true };

export type IPopupProps = ExtractProps<typeof PopupDesktop>;
