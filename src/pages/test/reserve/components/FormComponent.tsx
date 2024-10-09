import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../../../../components/ui";
import { cn } from "../../../../utils/cn";

interface FormComponentProps {
  form: any;
  onSubmit: (data: any) => void;
}

const FormComponent = ({ form, onSubmit }: FormComponentProps) => {
  const invalidStyle = (fieldState: any) => {
    return [
      !fieldState.error && !fieldState.invalid && fieldState.isDirty
        ? "focus-visible:ring-green-200"
        : fieldState.error
        ? "ring-offset-2 ring-red-200 ring-2"
        : "",
    ];
  };

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem className={"space-y-3 flex flex-col"}>
            <FormLabel
              className={"font-semibold text-left pl-2 pb-1 text-inherit"}
            >
              이메일
            </FormLabel>
            <FormControl>
              <Input
                size="xl"
                placeholder="이메일을 입력하세요"
                className={cn([invalidStyle(fieldState)])}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field, fieldState }) => (
          <FormItem className="space-y-3 flex flex-col">
            <FormLabel className="font-semibold text-left pl-2 pb-1 text-inherit">
              주소
            </FormLabel>
            <FormControl>
              <Input
                size="xl"
                placeholder="주소를 입력하세요"
                className={cn([invalidStyle(fieldState)])}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
export default FormComponent;
