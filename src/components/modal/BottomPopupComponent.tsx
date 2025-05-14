import clsx from 'clsx';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui';
import { useModal } from '../../hook/useModal';
import { isBottomPopupProps } from '../../types/modal';

const BottomPopupComponent = () => {
  const { isOpen, setIsOpen, modals } = useModal();

  if (modals && isBottomPopupProps(modals)) {
    const { props, Component, componentProps } = modals;

    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className={clsx('', {
            [`h-full rounded-none`]: props.compType?.includes('calendar'),
          })}
        >
          <DrawerClose asChild className="pb-1">
            <div className="flex flex-row justify-end mr-7 mt-1 cursor-pointer">
              <img
                src="/images/common/close.png"
                alt="drawer"
                className="w-4 h-4"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </DrawerClose>
          <DrawerHeader className="flex flex-col items-start">
            <DrawerTitle>{props.title}</DrawerTitle>
            <DrawerDescription
              hidden={props?.description !== undefined ? false : true}
            >
              {props?.description}
            </DrawerDescription>
          </DrawerHeader>
          <Component {...componentProps} />
          <DrawerFooter>
            <Button
              className="rounded-xl"
              size={'xl2'}
              onClick={() => {
                if (props?.onClickConfirm) {
                  props?.onClickConfirm();
                }
                setIsOpen(false);
                // close();
              }}
            >
              {props.confirmLabel}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return null;
  }
};
export default BottomPopupComponent;
