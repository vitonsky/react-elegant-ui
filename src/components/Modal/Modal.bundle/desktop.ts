import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Modal as ModalDesktop } from '../Modal';

import { withModModalViewDefault } from '../_view/Modal_view_default@desktop';

import { withModModalRenderAll } from '../_renderAll/Modal_renderAll';
import { withModModalPreventBodyScroll } from '../_preventBodyScroll/Modal_preventBodyScroll';
import { withModModalRenderToStack } from '../_renderToStack/Modal_renderToStack';

export const Modal = compose(
	withModModalRenderToStack,
	withModModalRenderAll,
	withModModalPreventBodyScroll,
	composeU(withModModalViewDefault),
)(ModalDesktop);

Modal.defaultProps = { view: 'default', hasAnimation: true };

export type IModalProps = ExtractProps<typeof ModalDesktop>;
