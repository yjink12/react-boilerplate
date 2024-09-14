import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTestStore } from "../../store/useTestStore";
import "./calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import uuid from "react-uuid";
dayjs.locale("ko");

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const markData = [
  {
    date: "2024-09-12",
    status: "possible",
    schedule: [],
  },
  {
    date: "2024-09-16",
    status: "disabled",
    schedule: ["추석"],
  },
  {
    date: "2024-09-17",
    status: "disabled",
    schedule: ["추석"],
  },
  {
    date: "2024-09-18",
    status: "disabled",
    schedule: ["추석"],
  },
  {
    date: "2024-09-24",
    status: "almostDone",
    schedule: ["-- 마감"],
  },
  {
    date: "2024-09-21",
    status: "almostDone",
    schedule: ["-- 마감"],
  },
];

const CalendarComponent = () => {
  const [value, setValue] = useState<Value>(new Date());
  const { setReserveDate } = useTestStore((state) => state);
  const [mark, setMark] = useState(markData);

  const handleDateChange = (selectedDate: any) => {
    setValue(selectedDate);
  };

  return (
    <div>
      <h1>날짜선택</h1>
      <div className="mt-4">
        {dayjs(value?.toString()).format("YYYY-MM-DD (ddd)")}
      </div>
      <div className="mt-4">
        <Calendar
          value={value}
          calendarType="gregory"
          onChange={handleDateChange}
          formatDay={(locale, date) => dayjs(date).format("DD")}
          minDate={new Date()}
          prev2Label={null}
          next2Label={null}
          tileClassName={({ date, view }) => {
            let className = "";
            // 토요일 스타일
            if (date.getDay() === 6) {
              className = "title_saturday";
            }
            // 날짜 비활성화
            if (
              mark.find((x: any) => x.date === dayjs(date).format("YYYY-MM-DD"))
            ) {
              className = "title_disabled";
            }
            return className;
          }}
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (
              mark.find((x: any) => x.date === dayjs(date).format("YYYY-MM-DD"))
            ) {
              const sameDate = mark.filter(
                (x) => x.date === dayjs(date).format("YYYY-MM-DD")
              );
              let statusName = "";
              switch (sameDate[0].status) {
                case "possible":
                  statusName = "예약가능";
                  break;
                case "almostDone":
                  statusName = "일부마감";
                  break;
                case "disabled":
                  statusName = "예약불가";
                  break;
                default:
                  break;
              }
              html.push(<div className={sameDate[0].status}>{statusName}</div>);
            }
            if (
              dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
            ) {
              // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
              html.push(<div className="today">Today</div>);
            }
            return (
              <div
                className="flex justify-center items-center absoluteDiv"
                key={uuid()}
              >
                {html}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
export default CalendarComponent;
