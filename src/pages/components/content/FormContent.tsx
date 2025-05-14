import { useNavigate } from 'react-router-dom';
import FormComponent from '../../../components/basic/FormComponent';
import { Button } from '../../../components/ui';

const FormContent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <FormComponent />
      <div className="font-semibold text-left">예시</div>
      <Button onClick={() => navigate('/reserve')}>건강검진 예약</Button>
    </div>
  );
};
export default FormContent;
