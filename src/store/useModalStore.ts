import { create } from "zustand";

/**
 * Record<key, value>
 *  eg) type Names = 'apple' | 'banana'
 *      type fruitsRecord = Record<Names, number>; 
 *      let fruits: fruitsRecord = {
 *          'apple': 100,
 *          'banana' : 200
 *      }
 */
export interface ModalComponentProps{
    type: "bottomPopup" | "dialog" | "default";
    props?: Record<string, any>
    Component: React.FC<any>;
    componentProps?: Record<string, any>;
}
interface ModalStoreState {
    modals: ModalComponentProps;
    isOpen: boolean;
}
interface ModalStoreAction {
    open: (
        type: string,
        props: Record<string, any>,
        Component: React.FC<any>,
        componentProps: Record<string, any>,
    ) => void;
    setIsOpen: (isOpen: boolean) => void;
}

type ModalStore = ModalStoreState & ModalStoreAction;

export const useModalStore = create<ModalStore>((set) => ({
    modals: { type: 'default', props: {}, Component: () => null, componentProps: {} } as ModalComponentProps,
    isOpen: false,
    open: (type, props, Component, componentProps) => set((state) => ({
        modals: {
            ...state.modals,
            type: type as "bottomPopup" | "dialog" | "default",
            props: props,
            Component: Component,
            componentProps: componentProps,
        },
        isOpen: true
    })),
    setIsOpen: (isOpen: boolean) => set({ isOpen : isOpen }),
}))