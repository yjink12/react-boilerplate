import { useModal } from '../../hook/useModal';
import { ModalContainer } from './ModalContainer';

/**
 *  useModalStore 로 부터 모달 가져오고
 *  가져온 모달을 타입에 따라 component로 렌더링
 */
const ModalComponent = () => {
  const { modals } = useModal();
  const { type } = modals;

  const ModalComponent = ModalContainer[type];
  return <>{ModalComponent && <ModalComponent />}</>;
};
export default ModalComponent;
