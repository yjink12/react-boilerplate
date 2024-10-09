import { questionnaire } from "./questionnaire";

const HealthQuestionnaireComponent = () => {
  return (
    <>
      {questionnaire.map((item, index) => (
        <div key={index}>{item.question}</div>
      ))}
    </>
  );
};
export default HealthQuestionnaireComponent;
