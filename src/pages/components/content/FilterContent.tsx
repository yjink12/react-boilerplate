import ButtonComponent, {
  ButtonProps,
} from '../../../components/basic/ButtonComponent';
import { Button, Separator } from '../../../components/ui';
import { useTestStore } from '../../../store/useTestStore';
import uuid from 'react-uuid';
import { MockCheckupList, MockLocationList } from '../../../utils/mockData';
import FilterCheckboxComponent, {
  CheckboxProps,
} from '../../../components/basic/FilterCheckboxComponent';
import { useModal } from '../../../hook/useModal';

const FilterContent = () => {
  const { open } = useModal();
  const { filterData, resetFilterData } = useTestStore((state) => state);

  // button filter label 가공
  const formattedFilterBtnLabel = (data: {
    key: string;
    label: string;
    value: number[];
    type: string;
  }) => {
    if (data.key === 'checkup') {
      const count =
        data.value.length > 0 && !data.value.includes(0)
          ? data.value.length
          : '';
      return `${data.label} ${count}`;
    } else {
      return data.label;
    }
  };
  // filter button click event
  const handleFilterBtn = (data: any) => {
    console.log('filter button click', data);

    let filterModalData = null;
    switch (data.key) {
      case 'location':
        filterModalData = {
          Component: ButtonComponent,
          componentProps: {
            data: MockLocationList as ButtonProps['data'],
          },
        };
        break;
      case 'checkup':
        filterModalData = {
          Component: FilterCheckboxComponent,
          componentProps: {
            data: MockCheckupList as CheckboxProps['data'],
            type: 'none',
            cols: 2,
          },
        };
        break;
      default:
        break;
    }
    if (filterModalData !== null) {
      open(
        'bottomPopup',
        { title: data.label, compType: data.type, confirmLabel: '선택완료' },
        filterModalData.Component,
        filterModalData.componentProps
      );
    }
  };

  // button filter
  const handleResetFilter = () => {
    console.log('filter ?>??');
    // 초기화
    resetFilterData();
  };

  return (
    <>
      <div className="flex flex-row">
        {filterData.map((data, index) => (
          <Button
            key={uuid()}
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
      <div className="mt-5">
        {filterData.map((data, index) => (
          <div key={uuid()}>
            {data.label}
            {data.value.map((value, index) => {
              return <div key={uuid()}>{value}</div>;
            })}
          </div>
        ))}
      </div>
    </>
  );
};
export default FilterContent;
