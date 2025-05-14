import { useState } from 'react';
import StepsComponent from '../../../components/basic/StepsComponent';
import { Button } from '../../../components/ui';

const StepsContent = () => {
  // steps
  const [stage, setStage] = useState(3);
  const [currentStage, setCurrentStage] = useState(1);

  // steps
  const next = () => {
    setCurrentStage(currentStage + 1);
  };
  const prev = () => {
    setCurrentStage(currentStage - 1);
  };
  const done = () => {
    alert('예약 완료');
  };

  return (
    <div>
      <StepsComponent stage={stage} current={currentStage} />
      <div className="flex flex-row justify-center">
        {currentStage > 1 && (
          <Button className="mt-6" onClick={() => prev()}>
            이전
          </Button>
        )}
        {currentStage < stage && (
          <Button className="mt-6" onClick={() => next()}>
            다음
          </Button>
        )}
        {currentStage === stage && (
          <Button className="mt-6" onClick={() => done()}>
            예약하기
          </Button>
        )}
      </div>
    </div>
  );
};
export default StepsContent;
