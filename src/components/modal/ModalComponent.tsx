import { useModal } from "../../hook/useModal";
import DialogComponent from "./DialogComponent";
import BottomPopupComponent from "./BottomPopupComponent";

/**
 *  useModalStore 로 부터 모달 가져오고
 *  가져온 모달을 타입에 따라 component로 렌더링
 */
const ModalComponent = () => {
  const { modals } = useModal();
  const { Component, props, componentProps, type } = modals;

  return (
    <>
      {type && type === "dialog" && <DialogComponent {...props} />}
      {type && type === "bottomPopup" && (
        <BottomPopupComponent {...props}>
          <Component {...componentProps} />
        </BottomPopupComponent>
      )}
    </>
  );
};
export default ModalComponent;
