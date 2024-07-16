import { Suspense } from "react";
import { getTodos } from "@/lib/todos";
import TodoWrapper from "@/components/TodoWrapper";

import "react-calendar/dist/Calendar.css";
import "../../assets/custom-calendar.css";

async function Todos() {
  const todos = await getTodos();
  return <TodoWrapper todos={todos} />;
}

export default function CalendarPage() {
  return (
    <main className="mt-8">
      <Suspense fallback={<p>Loading... Calendar</p>}>
        <Todos />
      </Suspense>
    </main>
  );
}
