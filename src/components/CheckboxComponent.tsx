import { useEffect, useState } from 'react';
import { Checkbox, ScrollArea } from './ui';
import uuid from 'react-uuid';
import { cn } from '../utils/cn';

interface CheckboxProps {
  type: string; // all(전체 선택) / none(초기화)
  data: {
    key: number;
    value: string;
    checked?: boolean;
    required?: boolean;
    disabled?: boolean;
  }[];
  cols: number;
  includeNA?: boolean;
}

const CheckboxComponent = ({ type, data, cols, includeNA }: CheckboxProps) => {
  // checkbox 리스트
  const [list, setList] = useState(data);
  // 선택한 checkbox 리스트
  const [selectList, setSelectList] = useState<number[]>([]);
  // 전체 선택 여부
  const [checkedAll, setCheckedAll] = useState(false);
  // 선택 안함 선택 여부
  const [checkedNone, setCheckedNone] = useState(false);

  // 개별 선택
  const onClickCheckbox = (key: number, checked: boolean) => {
    if (checked) {
      setSelectList([...selectList, key]);
    } else {
      setSelectList(selectList.filter((item) => item !== key));
    }

    // 리스트 update
    setList(
      list.map((item) =>
        item.key === key ? { ...item, checked: checked } : item
      )
    );
  };

  // 전체 선택
  const onClickAllCheckbox = (checked: any) => {
    console.log('????', checked);
    if (checked) {
      setSelectList(list.map((item) => item.key));
      setList(list.map((item) => ({ ...item, checked: true })));
    } else {
      // 초기화
      setSelectList([]);
      setList(list.map((item) => ({ ...item, checked: false })));
    }
  };

  // 초기화 선택
  const onClickResetCheckbox = (checked: any) => {
    if (checked) {
      setCheckedNone(true);
    } else {
      setCheckedNone(false);
    }
  };

  useEffect(() => {
    if (checkedNone) {
      if (type === 'default') {
        setSelectList([0]);
      } else {
        setSelectList([]);
      }
      setList(
        list.map((item) =>
          item.key === 0
            ? { ...item, checked: true, disabled: false }
            : { ...item, checked: false, disabled: true }
        )
      );
    }
  }, [checkedNone]);

  useEffect(() => {
    if (list.length === selectList.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [selectList]);

  useEffect(() => {
    if (includeNA) {
      setList([
        { key: 0, value: '해당없음', checked: false, disabled: false },
        ...data,
      ]);
    }
  }, [data]);

  return (
    <>
      {type === 'all' && (
        <div key={1} className="items-top flex space-x-2 mb-5">
          <Checkbox
            id="all"
            variant={'round'}
            onCheckedChange={(checked) => onClickAllCheckbox(checked)}
            checked={checkedAll}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`all`}
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              전체 선택
            </label>
          </div>
        </div>
      )}
      {type === 'none' && (
        <div key={2} className="items-top flex space-x-2 mb-5">
          <Checkbox
            id="none"
            onCheckedChange={(checked) => onClickResetCheckbox(checked)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`none`}
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              선택 안함
            </label>
          </div>
        </div>
      )}
      <div className={`grid grid-cols-${cols} gap-4 pb-16`}>
        {list.map((item) => {
          const id = uuid();
          return (
            <div key={item.key} className="items-top flex space-x-2">
              <Checkbox
                id={id}
                variant={type === 'none' ? 'default' : 'round'}
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
                  htmlFor={id}
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
      {/* <div>
        <div className="font-medium">선택한 id</div>
        {selectList.map((list) => (
          <div key={list}>{list}</div>
        ))}
      </div> */}
    </>
  );
};
export default CheckboxComponent;
