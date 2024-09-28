import { useModalStore } from "../store/useModalStore"

export const useModal = () => {
    const modals = useModalStore((state) => state.modals);
    const isOpen = useModalStore((state) => state.isOpen);
    const setIsOpen = useModalStore((state) => state.setIsOpen);
    const open = useModalStore((state) => state.open);
    // const close = useModalStore((state) => state.close);

    return {
        modals,
        isOpen,
        open,
        setIsOpen
        // close,
    }
}