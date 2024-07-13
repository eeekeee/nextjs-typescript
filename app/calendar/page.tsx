"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/custom-calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage() {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  const dateChangeHandler = (newDate: Value) => {
    setDate(newDate);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const addContent = ({ date }: { date: Date }) => {
    if (isSameDay(date, today)) {
      return (
        <p>
          Today {date.getMonth() + 1}/{date.getDate()}
        </p>
      );
    }
    return null;
  };

  return (
    <main>
      <div className="flex justify-center gap-2">
        <Calendar
          value={date}
          onChange={dateChangeHandler}
          locale="en"
          prev2Label={null}
          next2Label={null}
          tileContent={addContent}
        />
        <div className="w-[400px] p-4 border-red-500 border-4 rounded-2xl">
          일정 내용들
          <br />
          <p>
            {date?.toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
    </main>
  );
}
