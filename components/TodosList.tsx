import { Suspense, useState } from "react";
import { Await } from "react-router-dom";
import TodoItem from "./TodoItem";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Todo = {
  _id: string;
  title: string;
  date: Date;
};

export default function TodosList({
  date,
  todos,
}: {
  date: Value;
  todos: Todo[];
}) {
  return (
    <div className="w-[400px] p-4 border-gray-400 border-4 rounded-2xl">
      <h2>일정 내용들</h2>
      <p>
        {date?.toLocaleString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={todos}>
          {todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </Await>
      </Suspense>
    </div>
  );
}
