import { useEffect, useState } from 'react';
import CheckboxComponent from '../../../components/basic/CheckboxComponent';
import { Button, Separator } from '../../../components/ui';
import { useModal } from '../../../hook/useModal';
import { MockCheckupList } from '../../../utils/mockData';
import { CheckboxItem } from '../../../types/data';

const DrawerContent = () => {
  const { open } = useModal();
  // 선택된 검사 key 리스트
  const [selectedList, setSelectedList] = useState<number[]>([]);
  // 희망검사 checkbox 리스트
  const [checkupList, setCheckupList] =
    useState<CheckboxItem[]>(MockCheckupList);
  // 초기화 체크박스 상태
  const [resetChecked, setResetChecked] = useState(false);

  const handleCheckupConfirm = () => {
    alert(`선택 완료 ID`);
    // console.log("test");
  };

  const CustomCheckboxComponent = () => {
    return (
      <div className="px-5">
        <CheckboxComponent
          data={checkupList}
          cols={2}
          reset={{ include: false, label: '선택 안함', checked: resetChecked }}
          selectedListData={{
            selectedList: selectedList,
            setSelectedList: setSelectedList,
          }}
        />
      </div>
    );
  };

  // selectedList와 MockCheckupList의 key가 일치하는 항목을 찾아서 checked 상태로 변경
  const handleSelectdCheckup = () => {
    const newCheckupList: CheckboxItem[] = [];
    MockCheckupList.map((checkup) => {
      if (selectedList.includes(checkup.key)) {
        newCheckupList.push({ ...checkup, checked: true });
      } else {
        newCheckupList.push({ ...checkup, checked: false });
      }
    });
    setCheckupList(newCheckupList);
  };

  // 초기화 버튼 클릭 시 선택된 항목과 체크업 리스트를 초기화
  const onClickReset = () => {
    setSelectedList([]);
  };

  useEffect(() => {
    if (selectedList.includes(0)) {
      setResetChecked(true);
    } else {
      setResetChecked(false);
      handleSelectdCheckup();
    }
  }, [selectedList]);

  return (
    <div>
      <div>
        <div className="font-medium mb-5">선택한 id 확인</div>
        <span className="text-sm text-gray-500">
          {selectedList.length > 0 ? (
            <>
              {selectedList.map((item) => (
                <span
                  key={`select_${item}`}
                  className="inline-block mr-2 px-2 py-1 bg-blue-100 text-blue-800 rounded"
                >
                  {item}
                </span>
              ))}
            </>
          ) : (
            '선택된 항목이 없습니다.'
          )}
        </span>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row items-center gap-2 justify-center">
        <Button variant={'outline'} onClick={onClickReset}>
          초기화
        </Button>
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
              CustomCheckboxComponent,
              {}
            );
          }}
        >
          OPEN Drawer
        </Button>
      </div>
    </div>
  );
};
export default DrawerContent;
