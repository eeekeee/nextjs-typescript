import { useState } from "react";
import TodoModal from "./TodoModal";
import { deleteTodo } from "@/lib/todos";

type Todo = {
  _id: string;
  title: string;
  date: Date;
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const [focused, setFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);

  const mouseEnterHandler = () => {
    setFocused(true);
  };

  const mouseLeaveHandler = () => {
    setFocused(false);
  };

  const modalHandler = () => {
    setShowModal((prev) => !prev);
  };

  async function deleteTodoHandler() {
    const sure = window.confirm("일정을 삭제하시겠습니까?");

    if (sure) {
      const { success }: { success: boolean } = await deleteTodo(todo._id);
      if (success) {
        window.location.reload();
      } else {
        alert("일정 삭제 실패");
      }
    } else {
      return;
    }
  }

  return (
    <div
      className="flex justify-between border-4 p-4 mb-2"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {todo.title}
      <div className="flex gap-6">
        {focused && <button onClick={modalHandler}>수정</button>}
        {focused && <button onClick={deleteTodoHandler}>삭제</button>}
      </div>
      {showModal && (
        <TodoModal modalHandler={modalHandler} mode="edit" todo={todo} />
      )}
    </div>
  );
}
