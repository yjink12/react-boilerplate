import { useEffect, useState } from 'react';
import { Checkbox } from '../ui';
import { cn } from '../../utils/cn';
import { CheckboxItem } from '../../types/data';
import uuid from 'react-uuid';
import { CheckedState } from '@radix-ui/react-checkbox';

interface CheckboxProps {
  data: CheckboxItem[];
  cols: number;
  boxType?: 'default' | 'round'; // checkbox type
  reset?: { include: boolean; label: string; checked?: boolean }; // 초기화 checkbox 존재 여부
  all?: { label: string }; // 전체 선택 checkbox 존재 여부
  selectedListData: {
    selectedList: number[];
    setSelectedList: React.Dispatch<React.SetStateAction<number[]>>;
  };
}

const CheckboxComponent = ({
  data,
  cols,
  boxType,
  reset,
  all,
  selectedListData,
}: CheckboxProps) => {
  const uuidKey = uuid();
  // checkbox 리스트
  const [list, setList] = useState(data);
  // '전체 선택' 선택 여부
  const [checkedAll, setCheckedAll] = useState(false);
  // '선택 안함' 선택 여부
  const [checkedNone, setCheckedNone] = useState(reset?.checked || false);
  // props - 선택된 검사 key 리스트
  const { selectedList, setSelectedList } = selectedListData;

  // 개별 선택
  const onClickCheckbox = (key: number, checked: boolean) => {
    if (checked) {
      // 선택한 checkbox 리스트에 추가
      setSelectedList((prev: number[]) => [...prev, key]);
    } else {
      // 선택한 checkbox 리스트에서 제거
      setSelectedList((prev) => prev.filter((item) => item !== key));
    }

    // 리스트 update
    setList(
      list.map((item) =>
        item.key === key ? { ...item, checked: checked } : item
      )
    );
  };

  // 전체 선택
  const onClickAllCheckbox = (checked: CheckedState) => {
    if (checked) {
      setSelectedList(list.map((item) => item.key));
      setList(list.map((item) => ({ ...item, checked: true })));
    } else {
      // 초기화
      setSelectedList([]);
      setList(list.map((item) => ({ ...item, checked: false })));
    }
  };

  // 초기화 선택
  const onClickResetCheckbox = (checked: CheckedState) => {
    if (checked) {
      setCheckedNone(true);
    } else {
      setCheckedNone(false);
    }
  };

  useEffect(() => {
    if (checkedNone) {
      // '선택 안함' 설정일때 체크박스가 선택되면 모든 항목을 비활성화하고 선택 해제
      if (reset && !reset.include) {
        // 선택된 검사 key 리스트에 0 추가
        setSelectedList([0]);
      } else {
        setSelectedList([]);
      }
      setList(
        list.map((item) =>
          item.key === 0
            ? { ...item, checked: true, disabled: false }
            : { ...item, checked: false, disabled: true }
        )
      );
    }
    // '선택 안함' 설정이 해제되면 선택된 검사 key 리스트 초기화
    if (!checkedNone && selectedList.includes(0)) {
      setSelectedList([]);
    }
  }, [checkedNone]);

  useEffect(() => {
    // '전체 선택' 체크박스 상태 업데이트
    if (list.length === selectedList.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [selectedList, list.length]);

  return (
    <div>
      {all && (
        <div className="items-top flex space-x-2 mb-5">
          <Checkbox
            id="all_checkbox"
            variant={boxType ? boxType : 'default'}
            onCheckedChange={(checked) => onClickAllCheckbox(checked)}
            checked={checkedAll}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`all_checkbox`}
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {all.label ? all.label : '전체 선택'}
            </label>
          </div>
        </div>
      )}
      {reset && !reset?.include && (
        <div className="items-top flex space-x-2 mb-5">
          <Checkbox
            id="none_checkbox"
            onCheckedChange={(checked) => onClickResetCheckbox(checked)}
            checked={checkedNone}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`none_checkbox`}
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {reset?.label ? reset.label : '선택 안함'}
            </label>
          </div>
        </div>
      )}
      <div className={`grid grid-cols-${cols} gap-4 pb-16`}>
        {list.map((item) => {
          return (
            <div
              key={`${uuidKey}_${item.key.toString()}`}
              className="items-top flex space-x-2"
            >
              <Checkbox
                id={`${uuidKey}_${item.key.toString()}`}
                variant={boxType ? boxType : 'default'}
                checked={item.checked}
                onCheckedChange={(checked) => {
                  if (item.key === 0) {
                    onClickResetCheckbox(checked);
                  }
                }}
                onClick={() => onClickCheckbox(item.key, !item.checked)}
                disabled={checkedNone && item.key !== 0 ? item.disabled : false}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={`${uuidKey}_${item.key.toString()}`}
                  className={cn([
                    'text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
                    checkedNone && item.key !== 0 ? 'text-gray-500' : '',
                  ])}
                >
                  {item.value}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CheckboxComponent;
