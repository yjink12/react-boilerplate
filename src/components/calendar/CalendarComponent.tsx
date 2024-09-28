import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import uuid from "react-uuid";
import { useTestStore } from "../../store/useTestStore";
import { ScrollArea } from "../ui";
dayjs.locale("ko");

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const markData = [
  {
    date: "2024-09-04",
    status: "almostDone",
    schedule: ["2-3 주간보고"],
  },
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
    schedule: ["-- 마감", "--- 마감", "--- 마~감", "--- 마~~감", "--- 마~~~감"],
  },
];

interface CalendarProps {
  reserveDate: string | undefined;
  setReserveDate: (date: string) => void;
}

const CalendarComponent = ({ reserveDate, setReserveDate }: CalendarProps) => {
  const [value, setValue] = useState<Value>(new Date());
  const [mark, setMark] = useState(markData);
  const [scheduleList, setScheduleList] = useState<string[]>([]);
  /** 선택 날짜 */
  // const { setReserveDate } = useTestStore((state) => state);

  /** 날짜 선택시 */
  const handleDateChange = (selectedDate: Value) => {
    setValue(selectedDate);
    const formattedDate = dayjs(selectedDate as Date).format("YYYY-MM-DD");
    setReserveDate(formattedDate);
  };

  useEffect(() => {
    if (reserveDate !== undefined && reserveDate !== "") {
      setValue(new Date(reserveDate));
    }
  }, []);

  return (
    <ScrollArea className="h-5/6 w-full rounded-md border-none">
      <div className="flex flex-col justify-between items-center">
        <div>
          <Calendar
            value={value}
            calendarType="gregory"
            onChange={handleDateChange}
            formatDay={(locale, date) => dayjs(date).format("DD")}
            minDate={new Date()}
            prev2Label={null}
            next2Label={null}
            onClickDay={(value, event) => {
              const markData = mark.filter(
                (x) => x.date === dayjs(value).format("YYYY-MM-DD")
              );
              if (markData.length > 0) {
                setScheduleList(markData[0].schedule);
              } else {
                setScheduleList([]);
              }
            }}
            tileClassName={({ date, view }) => {
              let className = "";
              // 토요일 스타일
              if (date.getDay() === 6) {
                className = "title_saturday";
              }
              // 날짜 비활성화
              if (
                mark.find(
                  (x: any) =>
                    x.date === dayjs(date).format("YYYY-MM-DD") &&
                    x.status === "disabled"
                )
              ) {
                className = "title_disabled";
              }
              return className;
            }}
            tileContent={({ date, view }) => {
              // 날짜 타일에 컨텐츠 추가하기 (html 태그)
              // 추가할 html 태그를 변수 초기화
              let html = [];
              if (
                dayjs(date).format("YYYY-MM-DD") ===
                dayjs().format("YYYY-MM-DD")
              ) {
                // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                html.push(
                  <div key={uuid()} className="today">
                    Today
                  </div>
                );
              } else {
                // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                if (
                  mark.find(
                    (x: any) => x.date === dayjs(date).format("YYYY-MM-DD")
                  )
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
                  html.push(
                    <div key={uuid()} className={sameDate[0].status}>
                      {statusName}
                    </div>
                  );
                }
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
        <div className="border-2 rounded-xl border-slate-300 px-4 py-4 w-10/12">
          <div className="pb-2">
            {dayjs(value?.toString()).format("YYYY-MM-DD (ddd)")}
          </div>
          <ul className="list-disc leading-relaxed">
            {scheduleList.map((schedule, index) => {
              return (
                <li className="list-inside marker:text-blue-400" key={uuid()}>
                  {schedule}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
};
export default CalendarComponent;
