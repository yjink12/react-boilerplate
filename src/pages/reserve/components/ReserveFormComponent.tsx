import { UseFormReturn } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../../../components/ui';
import { cn } from '../../../utils/cn';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import { useModal } from '../../../hook/useModal';
import { useState } from 'react';

interface ReserveFormComponentProps {
  form: UseFormReturn<
    {
      hospital: string;
      fstWishDate: string;
      sndWishDate: string;
    },
    any,
    undefined
  >;
}

const ReserveFormComponent = ({ form }: ReserveFormComponentProps) => {
  /** validation invalid style */
  const invalidStyle = (fieldState: any) => {
    return [
      !fieldState.error && !fieldState.invalid && fieldState.isDirty
        ? 'focus-visible:ring-green-200'
        : fieldState.error
        ? 'ring-offset-2 ring-red-200 ring-2'
        : '',
    ];
  };
  const { open } = useModal();

  const onClickReserveDateConfirm = () => {
    alert('예약일 선택 완료');
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold">날짜 선택</h1>
      </div>
      <FormField
        control={form.control}
        name="hospital"
        render={({ field, fieldState }) => (
          <FormItem className={'space-y-3 flex flex-col'}>
            <FormLabel
              className={'font-semibold text-left pl-2 pb-1 text-inherit'}
            >
              검진 희망 병원
            </FormLabel>
            <FormControl>
              <Input
                size="xl"
                placeholder="검진 희망 병원을 입력하세요"
                className={cn([invalidStyle(fieldState)])}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fstWishDate"
        render={({ field, fieldState }) => (
          <FormItem className="space-y-3 flex flex-col">
            <FormLabel className="font-semibold text-left pl-2 pb-1 text-inherit">
              1차 예약 희망일
            </FormLabel>
            <div className="flex flex-row gap-2">
              <FormControl>
                <Input
                  size={'xl'}
                  placeholder="날짜선택"
                  className={cn([invalidStyle(fieldState)])}
                  readOnly
                  // value={fstReserveDate}
                  {...field}
                />
              </FormControl>
              <Button
                className="w-32"
                size="xl"
                type="button" // type button 으로 선언을 하지 않으면 submit으로 인식되어 폼이 제출됨
                onClick={() => {
                  console.log('form');
                  open(
                    'bottomPopup',
                    {
                      compType: 'calendar',
                      title: '날짜선택',
                      confirmLabel: '선택완료',
                      onClickConfirm: onClickReserveDateConfirm,
                    },
                    CalendarComponent,
                    {
                      reserveDate: field.value,
                      setReserveDate: field.onChange,
                    }
                  );
                }}
              >
                날짜 선택
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sndWishDate"
        render={({ field, fieldState }) => (
          <FormItem className="space-y-3 flex flex-col">
            <FormLabel className="font-semibold text-left pl-2 pb-1 text-inherit">
              2차 예약 희망일
            </FormLabel>
            <div className="flex flex-row gap-2">
              <FormControl className="flex flex-row">
                <Input
                  size={'xl'}
                  placeholder="날짜선택"
                  className={cn([invalidStyle(fieldState)])}
                  readOnly
                  // value={sndReserveDate}
                  {...field}
                />
              </FormControl>
              <Button
                className="w-32"
                size="xl"
                type="button"
                onClick={() =>
                  open(
                    'bottomPopup',
                    {
                      compType: 'calendar',
                      title: '날짜선택',
                      confirmLabel: '선택완료',
                      onClickConfirm: onClickReserveDateConfirm,
                    },
                    CalendarComponent,
                    {
                      reserveDate: field.value,
                      setReserveDate: field.onChange,
                    }
                  )
                }
              >
                날짜 선택
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
export default ReserveFormComponent;
