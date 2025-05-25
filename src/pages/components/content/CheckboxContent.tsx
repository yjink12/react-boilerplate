import { useEffect, useState } from 'react';
import CheckboxComponent from '../../../components/basic/CheckboxComponent';
import { Separator } from '../../../components/ui';
import {
  MockCheckupList,
  MockDsseList,
  MockTermsList,
} from '../../../utils/mockData';
import { CheckboxItem } from '../../../types/data';

const CheckboxContent = () => {
  // 질환 mock data
  const [dsseList, setDsseList] = useState<CheckboxItem[]>([]);
  // 전체 선택 checkbox 리스트
  const [selectedListTypeAll, setSelectedListTypeAll] = useState<number[]>([]);
  // 초기화 checkbox 리스트 - list 미포함
  const [selectedListTypeReset, setSelectedListTypeReset] = useState<number[]>(
    []
  );
  // 초기화 checkbox 리스트 - list 포함
  const [selectedListTypeResetList, setSelectedListTypeResetList] = useState<
    number[]
  >([]);

  useEffect(() => {
    let newDsseList = [];
    // 질환 mock data 해당 사항 없음 추가
    newDsseList.push(
      {
        key: 0,
        value: '해당 사항 없음',
        checked: false,
        disabled: false,
      },
      ...MockDsseList
    );
    // console.log('질환 데이터 List', newDsseList);
    setDsseList(newDsseList);
  }, []);

  return (
    <div className="flex flex-col space-y-4 text-left">
      <div>
        <div className="font-semibold mb-6">전체 선택 Checkbox </div>
        <div>
          <div className="font-medium mb-5">선택한 id 확인</div>
          <span className="text-sm text-gray-500">
            {selectedListTypeAll.length > 0
              ? selectedListTypeAll.join(', ')
              : '선택된 항목이 없습니다.'}
          </span>
        </div>
        <Separator className="my-4" />
        <CheckboxComponent
          all={{ label: '전체 선택' }}
          boxType={'round'}
          cols={1}
          data={MockTermsList}
          selectedListData={{
            selectedList: selectedListTypeAll,
            setSelectedList: setSelectedListTypeAll,
          }}
        />
      </div>
      <Separator className="my-6" />
      <div>
        <div className="font-semibold mb-6">초기화 checkbox - list 미포함 </div>
        <div>
          <div className="font-medium mb-5">선택한 id 확인</div>
          <span className="text-sm text-gray-500">
            {selectedListTypeReset.length > 0
              ? selectedListTypeReset.join(', ')
              : '선택된 항목이 없습니다.'}
          </span>
        </div>
        <Separator className="my-4" />
        <CheckboxComponent
          reset={{ include: false, label: '선택 안함' }}
          cols={2}
          data={MockCheckupList}
          selectedListData={{
            selectedList: selectedListTypeReset,
            setSelectedList: setSelectedListTypeReset,
          }}
        />
      </div>
      <Separator className="my-4" />
      <div>
        <div className="font-semibold mb-6">초기화 checkbox - list 포함 </div>
        <div>
          <div className="font-medium mb-5">선택한 id 확인</div>
          <span className="text-sm text-gray-500">
            {selectedListTypeResetList.length > 0
              ? selectedListTypeResetList.join(', ')
              : '선택된 항목이 없습니다.'}
          </span>
        </div>
        <Separator className="my-4" />
        {dsseList.length > 0 && (
          <CheckboxComponent
            boxType={'round'}
            cols={2}
            data={dsseList}
            selectedListData={{
              selectedList: selectedListTypeResetList,
              setSelectedList: setSelectedListTypeResetList,
            }}
          />
        )}
      </div>
      <Separator className="my-4" />
    </div>
  );
};
export default CheckboxContent;
