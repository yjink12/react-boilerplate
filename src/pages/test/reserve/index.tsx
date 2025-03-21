import { useEffect, useState } from "react";
import StepsComponent from "../../../components/StepsComponent";
import { Button, Form } from "../../../components/ui";
import HealthQuestionnaireComponent from "./components/HealthQuestionnaireComponent";
import FormComponent from "./components/FormComponent";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReserveFormComponent from "./components/ReserveFormComponent";

/** zod user info form schema (rules) */
export const userInfoFormSchema = z.object({
  email: z.string().min(1, { message: "필수!" }).email({
    message: "이메일 형식으로 입력해주세요.",
  }),
  address: z.string().min(1, { message: "필수!" }),
});

/** zod reservation form schema (rules) */
export const reserveFormSchema = z.object({
  hospital: z.string().min(1, { message: "필수!" }),
  fstWishDate: z.string().min(1, { message: "필수!" }),
  sndWishDate: z.string().min(1, { message: "필수!" }),
});

const TestReservePage = () => {
  const navigate = useNavigate();
  // steps state
  const [stage, setStage] = useState(3);
  const [currentStage, setCurrentStage] = useState(1);

  /** move steps */
  const next = async () => {
    console.log("next", currentStage);

    let isValid = false;
    switch (currentStage) {
      case 1:
        isValid = await userInfoTrigger();
        break;
      case 2:
        isValid = await reserveTrigger();
        break;
      default:
        break;
    }
    console.log("isValid", isValid);
    if (isValid) {
      setCurrentStage(currentStage + 1);
    }
  };
  const prev = () => {
    console.log("prev", currentStage);
    setCurrentStage(currentStage - 1);
  };
  const done = () => {
    alert("예약 완료");
  };

  /** 회원정보 form */
  const userInfoForm = useForm<z.infer<typeof userInfoFormSchema>>({
    resolver: zodResolver(userInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      address: "",
    },
  });
  const {
    register, // 각 입력 필드 등록, 유효성 검사 규칙 설정
    handleSubmit: userInfoHandleSubmit, // 폼 제출시 실행할 함수 정의
    formState: { errors: userInfoErrors }, // 유효성 검사 에러
    trigger: userInfoTrigger, // 유효성 검사 트리거
  } = userInfoForm;

  /** 예약 form */
  const reserveForm = useForm<z.infer<typeof reserveFormSchema>>({
    resolver: zodResolver(reserveFormSchema),
    mode: "onChange",
    defaultValues: {
      hospital: "",
      fstWishDate: "",
      sndWishDate: "",
    },
  });
  const {
    formState: { errors: reserveErrors },
    trigger: reserveTrigger,
  } = reserveForm;

  const onSubmit = (data: z.infer<typeof userInfoFormSchema>) => {
    console.log("submit data", data);
    // next();
  };

  useEffect(() => {
    console.log("currentStage", currentStage);
    console.log("userInfoForm", userInfoForm.getValues());
    console.log("reserveForm", reserveForm.getValues());
  }, [currentStage]);

  return (
    <div className="mt-1 pt-6 pl-7 pr-7">
      <StepsComponent stage={stage} current={currentStage} />
      <div className="flex flex-col gap-5 py-10 px-2">
        {currentStage === 1 && (
          <Form {...userInfoForm}>
            <form className="space-y-6">
              <FormComponent form={userInfoForm} />
            </form>
          </Form>
        )}
        {currentStage === 2 && (
          <>
            <Form {...reserveForm}>
              <form className="space-y-6">
                <ReserveFormComponent form={reserveForm} />
              </form>
            </Form>
          </>
        )}
        {currentStage === 3 && <HealthQuestionnaireComponent />}
        <div className="flex flex-row justify-around">
          <Button
            // disabled={currentStage === 1}
            size="xl2"
            className="w-36"
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
              size="xl2"
              className="w-36"
              onClick={() => next()}
              // type="submit"
            >
              다음
            </Button>
          )}
          {currentStage === stage && (
            <Button size="xl2" onClick={() => done()}>
              예약하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TestReservePage;
