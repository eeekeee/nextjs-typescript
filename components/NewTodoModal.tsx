import { createTodo } from "@/lib/todos";
import TodoSubmitButton from "./TodoSubmitButton";

export default function NewTodoModal({
  modalHandler,
}: {
  modalHandler: () => void;
}) {
  async function newTodo(formData: FormData) {
    const { success }: { success: boolean } = await createTodo(formData);
    if (success) {
      window.location.reload();
    } else {
      alert("일정 생성 실패");
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
        action={newTodo}
      >
        <p className="text-2xl pt-4 pb-8">일정 추가하기</p>
        <label htmlFor="title" className="text-2xl">
          Title
        </label>
        <input
          type="text"
          className="flex mt-4 border-gray-600 border py-2 px-4 "
          name="title"
          id="title"
          required
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
