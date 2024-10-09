import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import { cn } from "../../utils/cn";

const FormSchema = z.object({
  // type: z.enum(["all", "mentions", "none"], {
  //   required_error: "You need to select a notification type.",
  // }),
  email: z.string().min(1, { message: "필수!" }).email({
    message: "이메일 형식으로 입력해주세요.",
  }),
  address: z.string().min(1, { message: "필수!" }),
});

const FormComponent = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      address: "",
    },
  });

  const {
    register, // 각 입력 필드 등록, 유효성 검사 규칙 설정
    handleSubmit, // 폼 제출시 실행할 함수 정의
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("submit data", data);
  };

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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default FormComponent;
