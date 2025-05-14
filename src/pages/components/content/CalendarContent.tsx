import { useState } from 'react';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import { Button, Input } from '../../../components/ui';
import { useModal } from '../../../hook/useModal';

const CalendarContent = () => {
  const { open } = useModal();
  const [reserveDate, setReserveDate] = useState<string>('');
  const [sndReserveDate, setSndReserveDate] = useState<string>('');

  const handleReserveDateConfirm = () => {
    alert('예약일 선택 완료');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="font-semibold text-left">[1차 예약일] </div>
      <div className="flex flex-row gap-2">
        <Input placeholder="날짜선택" value={reserveDate} readOnly />
        <Button
          onClick={() =>
            open(
              'bottomPopup',
              {
                compType: 'calendar',
                title: '날짜선택',
                confirmLabel: '선택완료',
                onClickConfirm: handleReserveDateConfirm,
              },
              CalendarComponent,
              {
                reserveDate: reserveDate,
                setReserveDate: setReserveDate,
              }
            )
          }
        >
          달력 확인
        </Button>
      </div>
      <div className="font-semibold text-left">[2차 예약일] </div>
      <div className="flex flex-row gap-2">
        <Input placeholder="날짜선택" value={sndReserveDate} readOnly />
        <Button
          onClick={() =>
            open(
              'bottomPopup',
              {
                compType: 'calendar',
                title: '날짜선택',
                confirmLabel: '선택완료',
                onClickConfirm: handleReserveDateConfirm,
              },
              CalendarComponent,
              {
                reserveDate: sndReserveDate,
                setReserveDate: setSndReserveDate,
              }
            )
          }
        >
          달력 확인
        </Button>
      </div>
    </div>
  );
};
export default CalendarContent;
