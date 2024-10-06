import clsx from "clsx";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui";
import { useModal } from "../../hook/useModal";

interface BottomPopupProps {
  compType?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  onClickConfirm?: () => void;
  children: React.ReactNode;
}

const BottomPopupComponent = ({
  children,
  compType,
  title,
  description,
  confirmLabel,
  onClickConfirm,
}: BottomPopupProps) => {
  const { isOpen, setIsOpen } = useModal();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        className={clsx("", {
          [`h-full rounded-none`]: compType?.includes("calendar"),
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
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription hidden={description !== undefined ? false : true}>
            {description}
          </DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <Button
            className="rounded-xl"
            size={"lg"}
            onClick={() => {
              if (onClickConfirm) {
                onClickConfirm();
              }
              setIsOpen(false);
              // close();
            }}
          >
            {confirmLabel}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default BottomPopupComponent;
