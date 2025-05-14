import BottomPopupComponent from './BottomPopupComponent';
import DialogComponent from './DialogComponent';

export type ModalType = 'dialog' | 'bottomPopup';

type ModalContents = {
  [key in ModalType]: () => JSX.Element | null;
};

export const ModalContainer: ModalContents = {
  dialog: DialogComponent,
  bottomPopup: BottomPopupComponent,
};
