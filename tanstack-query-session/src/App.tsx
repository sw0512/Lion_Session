import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodosData } from "./hooks/useTodosData";

export default function App() {
  const { data: todos = [], isPending, isError, isFetching } = useTodosData();

  return (
    <main className="todo-card">
      <header className="todo-header">
        <p className="eyebrow">MY DAILY PLAN</p>
        <h1>오늘의 할 일</h1>
      </header>

      <TodoForm />

      <div className="list-heading">
        <h2>할 일 목록</h2>
        <span aria-live="polite">
          {isFetching ? "동기화 중..." : "10초마다 자동 동기화"}
        </span>
      </div>

      {isPending ? (
        <p>로딩 중...</p>
      ) : isError ? (
        <p>할 일 목록을 불러오지 못했습니다.</p>
      ) : (
        <TodoList todos={todos} />
      )}
    </main>
  );
}
