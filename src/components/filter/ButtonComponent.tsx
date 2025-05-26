import { useState } from 'react';
import { Button } from '../ui';

export interface ButtonProps {
  data: {
    key: number;
    label: string;
  }[];
  setSelectedList: React.Dispatch<
    React.SetStateAction<{ key: number; label: string }[]>
  >;
}

const ButtonComponent = ({ data, setSelectedList }: ButtonProps) => {
  // button 리스트
  const [list, setList] = useState(data);
  const [districtId, setDistrictId] = useState<number>();

  const onClickButton = (data: { key: number; label: string }) => {
    console.log('지역 data 확인', data);
    setSelectedList([data]);
    setDistrictId(data.key);
  };

  return (
    <div className="grid grid-cols-2 gap-4 pb-16 px-5">
      {list.map((item, index) => (
        <Button
          className="rounded-lg shadow-md"
          variant={districtId === item.key ? 'default' : 'outline'}
          size={'lg'}
          key={`${item.key}_${index}`}
          onClick={() => onClickButton(item)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
export default ButtonComponent;
