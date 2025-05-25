import { useState } from 'react';
import CheckboxComponent from '../../../components/basic/CheckboxComponent';
import RadioComponent from '../../../components/basic/RadioComponent';
import { questionnaire } from './questionnaire';

const HealthQuestionnaireComponent = () => {
  const [selectedList, setSelectedList] = useState<number[]>([]);

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
              {item.answerType === 'single' && (
                <RadioComponent data={item.answerList} />
              )}
              {item.answerType === 'multiple' && (
                <CheckboxComponent
                  boxType="round"
                  cols={2}
                  data={item.answerList}
                  selectedListData={{
                    selectedList: selectedList,
                    setSelectedList: setSelectedList,
                  }}
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
