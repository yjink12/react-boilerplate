import { create } from 'zustand';

/**
 * Record<key, value>
 *  eg) type Names = 'apple' | 'banana'
 *      type fruitsRecord = Record<Names, number>;
 *      let fruits: fruitsRecord = {
 *          'apple': 100,
 *          'banana' : 200
 *      }
 */
export interface ModalComponentProps {
  type: 'bottomPopup' | 'dialog' | 'default';
  props?: Record<string, any>; // 모달 자체에 전달할 속성들
  Component: React.FC<any>; // 모달 내부 렌더링될 컴포넌트
  componentProps?: Record<string, any>; // 컴포넌트에 전달할 속성들
}
interface ModalStoreState {
  modals: ModalComponentProps; // 현재 관리 중인 모달 컴포넌트
  isOpen: boolean;
}
interface ModalStoreAction {
  open: (
    type: string,
    props: Record<string, any>,
    Component: React.FC<any>,
    componentProps: Record<string, any>
  ) => void;
  setIsOpen: (isOpen: boolean) => void;
}

type ModalStore = ModalStoreState & ModalStoreAction;

export const useModalStore = create<ModalStore>((set) => ({
  modals: {
    type: 'default',
    props: {},
    Component: () => null,
    componentProps: {},
  } as ModalComponentProps,
  isOpen: false,
  open: (type, props, Component, componentProps) =>
    set((state) => ({
      modals: {
        ...state.modals,
        type: type as 'bottomPopup' | 'dialog' | 'default',
        props: props,
        Component: Component,
        componentProps: componentProps,
      },
      isOpen: true,
    })),
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen }),
}));
