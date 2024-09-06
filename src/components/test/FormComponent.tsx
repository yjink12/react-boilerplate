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

const FormSchema = z.object({
  // type: z.enum(["all", "mentions", "none"], {
  //   required_error: "You need to select a notification type.",
  // }),
  email: z.string().min(1, { message: "필수!" }).email({
    message: "이메일 형식으로 입력해주세요.",
  }),
});

const FormComponent = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "yjkim@aimmed.com",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("submit data", data);
    console.log("submit");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력하세요" {...field} />
              </FormControl>
              {/* <FormDescription>이메일을 입력하세요.</FormDescription> */}
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
