"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import TodosList from "./TodosList";
import TodoModal from "@/components/TodoModal";
import { formattedDate, isSameDay } from "@/util/date";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Todo = {
  _id: string;
  title: string;
  date: Date;
};

export default function TodoWrapper({ todos }: { todos: Todo[] }) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now());
  const [date, setDate] = useState<Value>(today);
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<Boolean>(false);

  useEffect(() => {
    if (date instanceof Date) {
      const selectedDate = formattedDate(date);
      const filteredTodos = allTodos.filter(
        (todo) => formattedDate(todo.date) === selectedDate
      );
      setCurrentTodos(filteredTodos);
    } else {
      setCurrentTodos([]);
    }
  }, [date, allTodos]);

  const modalHandler = () => {
    setShowModal((prev) => !prev);
  };

  const dateChangeHandler = (newDate: Value) => {
    setDate(newDate);
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
    const todosForDate = allTodos.filter((todo) => isSameDay(todo.date, date));

    for (let i = 0; i < todosForDate.length; i++) {
      content.push(<span key={`todo-${i}-${date.getDate()}`}>✨</span>);
    }

    return <>{content}</>;
  };

  return (
    <main>
      <div className="flex px-4 pb-4 justify-around items-center gap-4">
        <p className="p-4 text-3xl">
          {today.toLocaleString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>
        <button
          className="p-2 text-3xl border-gray-400 border-4 rounded-lg"
          onClick={modalHandler}
        >
          New
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <Calendar
          value={date}
          onChange={dateChangeHandler}
          locale="en"
          prev2Label={null}
          next2Label={null}
          tileContent={addContent}
        />
        <TodosList date={date} todos={currentTodos} />
      </div>
      {showModal && <TodoModal modalHandler={modalHandler} mode="new" />}
    </main>
  );
}
