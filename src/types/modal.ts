export interface DialogModalProps {
  type: string;
  title: string;
  description?: string;
  content: string;
  confirmLabel: string;
  onClickConfirm?: () => void;
}

export interface BottomPopupModalProps {
  compType: string;
  title: string;
  description?: string;
  confirmLabel: string;
  onClickConfirm?: () => void;
}

interface ModalComponentBase {
  Component: React.FC<any>; // 모달 내부 렌더링될 컴포넌트
  componentProps?: Record<string, any>; // 컴포넌트에 전달할 속성들
}

export interface DialogModalComponentProps extends ModalComponentBase {
  type: 'dialog';
  props: DialogModalProps;
}
export interface BottomPopupModalComponentProps extends ModalComponentBase {
  type: 'bottomPopup';
  props: BottomPopupModalProps;
}

/** modal type에 따른 Union Type */
export type ModalComponentProps =
  | DialogModalComponentProps
  | BottomPopupModalComponentProps;

/** 타입 가드 : 변수 타입 좁히기 - 유니온 타입 */
export function isDialogProps(
  modal: ModalComponentProps
): modal is DialogModalComponentProps {
  return modal.type === 'dialog';
}

export function isBottomPopupProps(
  modal: ModalComponentProps
): modal is BottomPopupModalComponentProps {
  return modal.type === 'bottomPopup';
}
