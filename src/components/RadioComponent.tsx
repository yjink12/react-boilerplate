import uuid from "react-uuid";
import { Label, RadioGroup, RadioGroupItem, ScrollArea } from "./ui";

interface RadioProps {
  data: {
    id: number;
    label: string;
    checked: boolean;
    disabled: boolean;
  }[];
}

const RadioComponent = ({ data }: RadioProps) => {
  return (
    <>
      <ScrollArea className="h-80 w-full rounded-md border-none">
        <RadioGroup defaultValue={"1"} className="grid grid-cols-2 gap-4 pb-16">
          {data.map((checkup) => {
            const id = uuid();
            return (
              <div key={checkup.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  size="lg"
                  value={checkup.id.toString()}
                  id={id}
                />
                <Label htmlFor={id} className="text-lg cursor-pointer">
                  {checkup.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </ScrollArea>
    </>
  );
};
export default RadioComponent;
