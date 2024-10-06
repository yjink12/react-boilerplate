import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useModal } from "../../hook/useModal";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui";

interface DialogProps {
  type?: string;
  title?: string;
  description?: string;
  content?: string;
  confirmLabel?: string;
  onClickConfirm?: () => void;
}

const DialogComponent = ({
  type,
  title,
  description,
  content,
  confirmLabel,
  onClickConfirm,
}: DialogProps) => {
  const { isOpen, setIsOpen } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[325px] rounded-2xl">
        <DialogHeader>
          <div className="text-2xl py-2 ">
            {type === "success" ? (
              <CheckCircleOutlined className="text-green-600" />
            ) : (
              <ExclamationCircleOutlined className="text-red-600" />
            )}
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription hidden={description !== undefined ? false : true}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center py-4">{content}</div>
        <DialogFooter>
          <Button
            className="rounded-3xl"
            onClick={() => {
              if (onClickConfirm) {
                onClickConfirm();
              }
              setIsOpen(false);
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogComponent;
