import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Modal as ModalDesktop } from '../Modal';

import { withModModalViewDefault } from '../_view/Modal_view_default';

import { withModModalRenderAll } from '../_renderAll/Modal_renderAll';

export const Modal = compose(
	composeU(withModModalViewDefault),
	withModModalRenderAll,
)(ModalDesktop);

Modal.defaultProps = { view: 'default' };

export type IModalProps = ExtractProps<typeof ModalDesktop>;
