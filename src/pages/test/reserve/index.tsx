import { useEffect, useState } from "react";
import StepsComponent from "../../../components/StepsComponent";
import { Button, Form } from "../../../components/ui";
import HealthQuestionnaireComponent from "./components/HealthQuestionnaireComponent";
import FormComponent from "./components/FormComponent";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormSchema = z.object({
  email: z.string().min(1, { message: "필수!" }).email({
    message: "이메일 형식으로 입력해주세요.",
  }),
  address: z.string().min(1, { message: "필수!" }),
});

const TestReservePage = () => {
  const navigate = useNavigate();
  // steps
  const [stage, setStage] = useState(3);
  const [currentStage, setCurrentStage] = useState(1);

  // steps
  const next = () => {
    console.log("next", currentStage);
    setCurrentStage(currentStage + 1);
  };
  const prev = () => {
    console.log("prev", currentStage);
    setCurrentStage(currentStage - 1);
  };
  const done = () => {
    alert("예약 완료");
  };

  /** tkd */
  const userInfoform = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      address: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("submit data", data);
    next();
  };

  const {
    register, // 각 입력 필드 등록, 유효성 검사 규칙 설정
    handleSubmit, // 폼 제출시 실행할 함수 정의
    formState: { errors },
    trigger,
  } = userInfoform;

  useEffect(() => {}, [currentStage]);

  return (
    <div className="mt-1 pt-6 pl-7 pr-7">
      <StepsComponent stage={stage} current={currentStage} />
      <div className="flex flex-col justify-between py-8 px-2">
        <Form {...userInfoform}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {currentStage === 1 && (
              <FormComponent form={userInfoform} onSubmit={onSubmit} />
            )}
            {currentStage === 3 && <HealthQuestionnaireComponent />}
            <div className="flex flex-row justify-around">
              <Button
                // disabled={currentStage === 1}
                size="lg"
                variant="outline"
                onClick={() => {
                  if (currentStage === 1) {
                    navigate(-1);
                  } else {
                    prev();
                  }
                }}
              >
                이전
              </Button>
              {currentStage < stage && (
                <Button
                  size="lg"
                  // onClick={() => {
                  //   next();
                  // }}
                  type="submit"
                >
                  다음
                </Button>
              )}
              {currentStage === stage && (
                <Button size="lg" onClick={() => done()}>
                  예약하기
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default TestReservePage;
