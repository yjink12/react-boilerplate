import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useModal } from '../../hook/useModal';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui';
import { isDialogProps } from '../../types/modal';

const DialogComponent = () => {
  const { isOpen, setIsOpen, modals } = useModal();

  if (modals && isDialogProps(modals)) {
    const { props } = modals;

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[325px] rounded-2xl">
          <DialogHeader>
            <div className="text-2xl py-2 ">
              {props.type === 'success' ? (
                <CheckCircleOutlined className="text-green-600" />
              ) : (
                <ExclamationCircleOutlined className="text-red-600" />
              )}
            </div>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription
              hidden={props?.description !== undefined ? false : true}
            >
              {props?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-4">{props.content}</div>
          <DialogFooter>
            <Button
              className="rounded-3xl"
              onClick={() => {
                if (props?.onClickConfirm) {
                  props?.onClickConfirm();
                }
                setIsOpen(false);
              }}
            >
              {props.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default DialogComponent;
