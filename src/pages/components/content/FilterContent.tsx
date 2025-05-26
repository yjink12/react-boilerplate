import ButtonComponent from '../../../components/filter/ButtonComponent';
import { Button, Separator } from '../../../components/ui';
import { MockCheckupList, MockDistrictList } from '../../../utils/mockData';
import { useModal } from '../../../hook/useModal';
import CheckboxComponent from '../../../components/basic/CheckboxComponent';
import { useEffect, useState } from 'react';
import {
  FilterDataType,
  isCheckupFilter,
  isDistrictFilter,
} from '../../../types/filter';
import { CheckboxItem } from '../../../types/data';

const FilterContent = () => {
  const { open } = useModal();
  // 초기화 체크박스 상태
  const [resetChecked, setResetChecked] = useState(false);
  // 선택된 지역 리스트
  const [selectedDistrictList, setSelectedDistrictList] = useState<
    { key: number; label: string }[]
  >([]);
  // 선택된 희망검사 리스트
  const [selectedCheckupList, setSelectedCheckupList] = useState<number[]>([]);
  // 희망검사 checkbox 리스트
  const [checkupList, setCheckupList] =
    useState<CheckboxItem[]>(MockCheckupList);

  const filterData: FilterDataType[] = [
    {
      key: 'district',
      label: '지역선택',
      value: selectedDistrictList,
      type: 'button',
    },
    {
      key: 'checkup',
      label: '희망검사',
      value: selectedCheckupList,
      type: 'checkbox',
    },
  ];

  const CustomCheckboxComponent = () => {
    return (
      <div className="px-5">
        <CheckboxComponent
          data={checkupList}
          cols={2}
          reset={{ include: false, label: '선택 안함', checked: resetChecked }}
          selectedListData={{
            selectedList: selectedCheckupList,
            setSelectedList: setSelectedCheckupList,
          }}
        />
      </div>
    );
  };

  const CustomButtonComponent = () => {
    return (
      <div className="px-5">
        <ButtonComponent
          data={MockDistrictList}
          setSelectedList={setSelectedDistrictList}
        />
      </div>
    );
  };

  // filter button click event
  const handleFilterBtn = (data: FilterDataType) => {
    // modal에 넘겨줄 컴포넌트와 props 설정
    let filterModalData: {
      Component: React.FC<any>;
    } = {
      Component: () => null,
    };
    switch (data.key) {
      case 'district':
        filterModalData = {
          Component: CustomButtonComponent,
        };
        break;
      case 'checkup':
        filterModalData = {
          Component: CustomCheckboxComponent,
        };
        break;
      default:
        break;
    }
    // modal open
    if (filterModalData !== null) {
      open(
        'bottomPopup',
        { title: data.label, compType: data.type, confirmLabel: '선택완료' },
        filterModalData.Component,
        {}
      );
    }
  };

  // button filter
  const handleResetFilter = () => {
    // 초기화
    setSelectedDistrictList([]);
    setSelectedCheckupList([]);
    setResetChecked(false);
  };

  // button filter label 가공
  const formattedFilterBtnLabel = (data: FilterDataType) => {
    if (isCheckupFilter(data)) {
      const count =
        data.value.length > 0 && !data.value.includes(0)
          ? `${data.value.length}`
          : '';
      return `${data.label} ${count}`;
    } else {
      return data.value.length > 0 ? data.value[0].label : data.label; // 지역 선택의 경우 첫 번째 선택된 지역의 label을 표시
    }
  };

  const handleSelectdCheckup = () => {
    const newCheckupList: CheckboxItem[] = [];
    MockCheckupList.map((checkup) => {
      if (selectedCheckupList.includes(checkup.key)) {
        newCheckupList.push({ ...checkup, checked: true });
      } else {
        newCheckupList.push({ ...checkup, checked: false });
      }
    });
    setCheckupList(newCheckupList);
  };

  useEffect(() => {
    if (selectedCheckupList.includes(0)) {
      setResetChecked(true);
    } else {
      setResetChecked(false);
      handleSelectdCheckup();
    }
  }, [selectedCheckupList]);

  return (
    <>
      <div className="flex flex-row">
        {filterData.map((data, index) => (
          <Button
            key={`${data.key}_${index}`}
            variant={'outline'}
            className="rounded-3xl mr-2"
            onClick={() => handleFilterBtn(data)}
          >
            {formattedFilterBtnLabel(data)}
          </Button>
        ))}
        <Button
          className="rounded-3xl mr-2"
          onClick={() => handleResetFilter()}
        >
          필터초기화
        </Button>
      </div>
      <Separator className="my-8" />
      <div className="mt-5 text-left">
        {filterData.map((data, index) => (
          <div key={`${data.key}_${index}`} className="mb-5">
            {data.label}
            <div className="mt-3">
              {isCheckupFilter(data) && (
                <div>
                  {data.value.length > 0 ? (
                    <>
                      {data.value.map((item, idx) => (
                        <span
                          key={`checkup_item_${idx}`}
                          className={
                            item === 0
                              ? 'text-sm text-gray-500'
                              : 'inline-block mr-2 px-2 py-1 bg-blue-100 text-blue-800 rounded'
                          }
                        >
                          {item === 0 ? '선택된 항목이 없습니다.' : item}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">
                      선택된 항목이 없습니다.
                    </span>
                  )}
                </div>
              )}
              {isDistrictFilter(data) && (
                <span className="text-sm text-gray-500">
                  {data.value.length > 0
                    ? data.value[0].key
                    : '선택된 항목이 없습니다.'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default FilterContent;
