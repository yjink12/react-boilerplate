import { AlertMessage } from '../../../components/modal/alertMessage';
import DialogComponent from '../../../components/modal/DialogComponent';
import { Button } from '../../../components/ui';
import { useModal } from '../../../hook/useModal';

const DialogContent = () => {
  const { open } = useModal();

  // dialog
  const handleOpenDialog = (key: string, type: string) => {
    const messageData = AlertMessage.filter(
      (message) => message.type === type && message.key === key
    );
    console.log('messageData', messageData);

    open(
      'dialog',
      {
        type: messageData[0].type,
        title: messageData[0].title,
        // description: "설명",
        content: messageData[0].content,
        confirmLabel: messageData[0].confirmLabel,
        onClickConfirm: () => {
          alert('확인');
        },
      },
      DialogComponent,
      {}
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="font-semibold text-left">예약하기 (성공) </div>
        <Button onClick={() => handleOpenDialog('reserve', 'success')}>
          예약 성공
        </Button>
        <div className="font-semibold text-left">예약하기 (실패) </div>
        <Button onClick={() => handleOpenDialog('reserve', 'error')}>
          예약 실패
        </Button>
      </div>
    </>
  );
};
export default DialogContent;
