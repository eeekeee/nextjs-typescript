"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/custom-calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Todo = {
  title: string;
  date: Date;
};

export default function CalendarPage() {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [date, setDate] = useState<Value>(today);
  const [todos, setTodos] = useState<Todo[]>([]);

  const sampleTodos = [
    {
      title: "놀기",
      date: new Date("2024-07-12"),
    },
    {
      title: "놀기",
      date: new Date("2024-07-15"),
    },
    {
      title: "놀기2xxxxxxxxxxxxxxxxx",
      date: new Date("2024-07-15"),
    },
    {
      title: "놀기3",
      date: new Date("2024-07-15"),
    },
    {
      title: "공부하기 16",
      date: new Date("2024-07-16"),
    },
    {
      title: "운동하기 17",
      date: new Date("2024-07-17"),
    },
    {
      title: "운동하기 29",
      date: new Date("2024-07-29"),
    },
    {
      title: "운동하기 8-2",
      date: new Date("2024-08-2"),
    },
  ];

  useEffect(() => {
    if (date instanceof Date) {
      const selectedDate = formattedDate(date);
      const filteredTodos = sampleTodos.filter(
        (todo) => formattedDate(todo.date) === selectedDate
      );
      setTodos(filteredTodos);
    } else {
      setTodos([]);
    }
  }, [date]);

  const formattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
    let content = [];
    if (isSameDay(date, today)) {
      content.push(
        <p key={`today-${date.getDate()}`}>
          Today {date.getMonth() + 1}/{date.getDate()}
        </p>
      );
    } else {
      content.push(<br key={`break-${date.getDate()}`} />);
    }
    const todosForDate = sampleTodos.filter((todo) =>
      isSameDay(todo.date, date)
    );

    for (let i = 0; i < todosForDate.length; i++) {
      content.push(<span key={`todo-${i}-${date.getDate()}`}>✨</span>);
    }

    return <>{content}</>;
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
          {todos.map((todo, index) => (
            <p key={index} className="border-4 py-4">
              {todo.title}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
