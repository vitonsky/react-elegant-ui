import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Modal as ModalDesktop } from '../Modal';

import { withModModalViewDefault } from '../_view/Modal_view_default';

export const Modal = compose(composeU(withModModalViewDefault))(ModalDesktop);

Modal.defaultProps = { view: 'default' };

export type IModalProps = ExtractProps<typeof ModalDesktop>;
