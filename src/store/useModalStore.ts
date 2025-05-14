import { create } from 'zustand';
import {
  BottomPopupModalProps,
  DialogModalProps,
  ModalComponentProps,
} from '../types/modal';

// type ModalType = 'dialog' | 'bottomPopup';

interface ModalStoreState {
  modals: ModalComponentProps; // 현재 관리 중인 모달 컴포넌트
  isOpen: boolean;
}

/** 상태 변경 액션 - 제네릭 사용 -> 모달 유형에 따라 타입 분기*/
interface ModalStoreAction {
  open: <T extends ModalComponentProps['type']>(
    type: T,
    props: T extends 'dialog' ? DialogModalProps : BottomPopupModalProps,
    Component: React.FC<any>,
    componentProps: Record<string, any>
  ) => void; // 모달 open, 상태 update
  setIsOpen: (isOpen: boolean) => void; // 모달 open true/false
}

type ModalStore = ModalStoreState & ModalStoreAction;

export const useModalStore = create<ModalStore>((set) => ({
  // 초기 상태 값 설정
  modals: {
    type: 'dialog',
    props: {
      type: '',
      title: '',
      description: '',
      content: '',
      confirmLabel: '',
      compType: '',
    },
    Component: () => null,
    componentProps: {},
  } as ModalComponentProps,
  isOpen: false,
  open: (type, props, Component, componentProps) =>
    set(() => ({
      modals: {
        type,
        props: props,
        Component,
        componentProps,
      } as ModalComponentProps,
      isOpen: true,
    })),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
