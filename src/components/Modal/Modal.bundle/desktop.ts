import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Modal as ModalDesktop } from '../Modal';

import { withModModalViewDefault } from '../_view/Modal_view_default';

import { withModModalRenderAll } from '../_renderAll/Modal_renderAll';
import { withModModalPreventBodyScroll } from '../_preventBodyScroll/Modal_preventBodyScroll';

export const Modal = compose(
	composeU(withModModalViewDefault),
	withModModalRenderAll,
	withModModalPreventBodyScroll,
)(ModalDesktop);

Modal.defaultProps = { view: 'default' };

export type IModalProps = ExtractProps<typeof ModalDesktop>;
