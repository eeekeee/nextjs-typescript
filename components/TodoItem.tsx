import { Component, FC, useState } from "react";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Todo = {
  _id: string;
  title: string;
  date: Date;
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const [focused, setFocused] = useState<boolean>(false);

  const mouseEnterHandler = () => {
    setFocused(true);
  };

  const mouseLeaveHandler = () => {
    setFocused(false);
  };

  return (
    <div
      className="flex justify-between border-4 p-4 mb-2"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {todo.title}
      <div className="flex gap-6">
        {focused && <button>수정</button>}
        {focused && <button>삭제</button>}
      </div>
    </div>
  );
}
