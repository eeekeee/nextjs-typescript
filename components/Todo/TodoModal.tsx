import { createTodo, updateTodo } from "@/lib/todos";
import TodoSubmitButton from "./TodoSubmitButton";
import { formattedDate } from "@/util/date";

type Todo = {
  _id: string;
  title: string;
  date: Date;
};

export default function TodoModal({
  modalHandler,
  mode,
  todo = { _id: "", title: "", date: new Date() },
}: {
  modalHandler: () => void;
  mode: string;
  todo?: Todo;
}) {
  let content;

  if (mode === "new") {
    content = "일정 추가하기";
  } else if (mode === "edit") {
    content = "일정 수정하기";
  }

  async function newTodoHandler(formData: FormData) {
    const { success }: { success: boolean } = await createTodo(formData);
    if (success) {
      window.location.reload();
    } else {
      alert("일정 생성 실패");
    }
  }
  async function updateTodoHandler(formData: FormData) {
    if (!todo) {
      new Error("업데이트 실패");
    }

    const { success }: { success: boolean } = await updateTodo(
      formData,
      todo._id
    );
    if (success) {
      window.location.reload();
    } else {
      alert("일정 수정 실패");
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center"
      onClick={modalHandler}
    >
      <form
        className="p-4 w-[480px] rounded-lg flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
        action={mode === "new" ? newTodoHandler : updateTodoHandler}
      >
        <p className="text-2xl pt-4 pb-8">{content}</p>
        <label htmlFor="title" className="text-2xl">
          Title
        </label>
        <input
          type="text"
          className="flex mt-4 border-gray-600 border py-2 px-4 "
          name="title"
          id="title"
          required
          defaultValue={todo.title}
        />

        <label htmlFor="date" className="pt-4 text-2xl">
          Date
        </label>
        <input
          type="date"
          className="flex mt-4 border-gray-600 border py-2 px-4 "
          name="date"
          id="date"
          required
          defaultValue={formattedDate(todo.date)}
        />

        <div className="flex justify-end mt-8">
          <button
            className="border-none w-28 py-2 px-4 text-base"
            onClick={modalHandler}
          >
            Cancel
          </button>
          <TodoSubmitButton />
        </div>
      </form>
    </div>
  );
}
