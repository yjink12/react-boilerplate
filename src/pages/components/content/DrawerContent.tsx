import FilterCheckboxComponent from '../../../components/basic/FilterCheckboxComponent';
import { Button } from '../../../components/ui';
import { useModal } from '../../../hook/useModal';
import { MockCheckupList } from '../../../utils/mockData';

const DrawerContent = () => {
  const { open } = useModal();

  const handleCheckupConfirm = () => {
    alert('선택 완료 test');
    // console.log("test");
  };

  return (
    <Button
      onClick={() => {
        open(
          'bottomPopup',
          {
            compType: 'checkbox',
            title: '희망검사 선택',
            description: '희망검사를 선택해주세요.',
            confirmLabel: '선택완료',
            onClickConfirm: handleCheckupConfirm,
          },
          FilterCheckboxComponent,
          {
            data: MockCheckupList,
            type: 'none',
            cols: 2,
          }
        );
      }}
    >
      OPEN Drawer
    </Button>
  );
};
export default DrawerContent;
