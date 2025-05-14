import { useEffect, useState } from 'react';
import CardComponent from '../../../components/basic/CardComponent';
import { Separator } from '../../../components/ui';
import {
  MockReserveUserInfo,
  MockReserveUserInfoLabel,
  MockUserInfo,
  MockUserInfoLabel,
} from '../../../utils/mockData';

const CardContent = () => {
  // 회원 정보
  const [userInfo, setUserInfo] = useState<any[]>([]);
  // 예약자 정보
  const reserveUserInfoTitle = '예약자 정보';
  const [reserveUserInfo, setReserveUserInfo] = useState<any[]>([]);

  /** 회원 정보 데이터 가공 */
  const handleUserInfo = () => {
    let newUserInfo: {
      key: string;
      label: string;
      value: string;
      highlight: boolean;
    }[] = [];
    MockUserInfoLabel.map((info) => {
      newUserInfo.push({
        key: info.key,
        label: info.label,
        value: MockUserInfo[info.key].value,
        highlight: MockUserInfo[info.key].highlight,
      });
    });
    setUserInfo(newUserInfo);
  };

  /** 예약자 정보 데이터 가공 */
  const handleReserveUserInfo = () => {
    let newReserveUserInfo: {
      key: string;
      label: string;
      value: string;
      highlight: boolean;
    }[] = [];
    MockReserveUserInfoLabel.map((info) => {
      newReserveUserInfo.push({
        key: info.key,
        label: info.label,
        value: MockReserveUserInfo[info.key].value,
        highlight: MockReserveUserInfo[info.key].highlight,
      });
    });
    setReserveUserInfo(newReserveUserInfo);
  };

  useEffect(() => {
    handleUserInfo();
    handleReserveUserInfo();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="font-semibold mb-5">[기본 정보 Card]</div>
      <CardComponent type={'default'} data={userInfo} />
      <Separator className="my-8" />
      <div className="font-semibold mb-5">[예약자 정보 Card]</div>
      <CardComponent
        type={'info'}
        title={reserveUserInfoTitle}
        data={reserveUserInfo}
      />
      <Separator className="my-8" />
    </div>
  );
};
export default CardContent;
