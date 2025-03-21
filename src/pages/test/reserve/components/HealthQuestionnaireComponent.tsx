import CheckboxComponent from "../../../../components/CheckboxComponent";
import RadioComponent from "../../../../components/RadioComponent";
import { questionnaire } from "./questionnaire";

const HealthQuestionnaireComponent = () => {
  return (
    <>
      <h1 className="text-xl font-bold text-left">문진표 작성</h1>
      <div className="pt-5">
        {questionnaire.map((item, index) => (
          <div key={index} className="flex flex-col gap-7">
            <div className="font-medium text-left">
              {`Q${item.sequence}. ${item.question}`}
            </div>
            <div>
              {item.answerType === "single" && (
                <RadioComponent data={item.answerList} />
              )}
              {item.answerType === "multiple" && (
                <CheckboxComponent
                  type={item.includeNA ? "default" : "none"}
                  cols={2}
                  data={item.answerList}
                  includeNA={item.includeNA}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default HealthQuestionnaireComponent;
