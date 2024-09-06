import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTestStore } from "../../store/useTestStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());
  const { setReserveDate } = useTestStore((state) => state);

  return (
    <div>
      <h1>날짜선택</h1>
      <div className="mt-4">
        <Calendar
          value={value}
          onChange={() => onChange}
          formatDay={(locale, date) => dayjs(date).format("DD")}
          minDate={new Date()}
        />
      </div>
      <div className="mt-4">{dayjs(value).format("YYYY-MM-DD (ddd)")}</div>
    </div>
  );
};
export default CalendarComponent;
