import { useEffect, useState } from 'react';
import CheckboxComponent from '../../../components/basic/CheckboxComponent';
import { Separator } from '../../../components/ui';
import {
  MockCheckupList,
  MockDsseList,
  MockTermsList,
} from '../../../utils/mockData';

const CheckboxContent = () => {
  // 질환 mock data
  const [dsseList, setDsseList] = useState<
    { key: number; value: string; checked: boolean; disabled: boolean }[]
  >([]);

  useEffect(() => {
    let newDsseList = [];
    newDsseList.push(
      {
        key: 0,
        value: '해당 사항 없음',
        checked: false,
        disabled: false,
      },
      ...MockDsseList
    );
    console.log('newDsseList', newDsseList);
    setDsseList(newDsseList);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="font-semibold mb-5">[전체 선택 Checkbox] </div>
      <CheckboxComponent type={'all'} cols={1} data={MockTermsList} />
      <Separator className="my-4" />
      <div className="font-semibold mb-5">
        [초기화 checkbox - list 미포함(희망검사)]{' '}
      </div>
      <CheckboxComponent type={'none'} cols={2} data={MockCheckupList} />
      <Separator className="my-4" />
      <div className="font-semibold mb-5">
        [초기화 checkbox - list 포함(문진)]{' '}
      </div>
      <CheckboxComponent type={'default'} cols={2} data={dsseList} />
      <Separator className="my-4" />
    </div>
  );
};
export default CheckboxContent;
