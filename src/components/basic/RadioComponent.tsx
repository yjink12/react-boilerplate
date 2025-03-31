import uuid from 'react-uuid';
import { Label, RadioGroup, RadioGroupItem, ScrollArea } from '../ui';

interface RadioProps {
  data: {
    key: number;
    value: string;
    checked?: boolean;
    disabled?: boolean;
  }[];
}

const RadioComponent = ({ data }: RadioProps) => {
  return (
    <>
      {/* <ScrollArea className="h-80 w-full rounded-md border-none"> */}
      <RadioGroup className="grid grid-cols-2 gap-4 pb-16">
        {data.map((item, index) => {
          const id = uuid();
          return (
            <div key={item.key} className="flex items-center space-x-2">
              <RadioGroupItem
                size="lg"
                value={item.key.toString()}
                id={index.toString()}
              />
              <Label
                htmlFor={index.toString()}
                className="text-lg cursor-pointer"
              >
                {item.value}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      {/* </ScrollArea> */}
    </>
  );
};
export default RadioComponent;
