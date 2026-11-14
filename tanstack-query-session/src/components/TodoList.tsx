import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api/todo";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const queryClient = useQueryClient();

  const {
    mutate: updateTodoMutate,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateTodo,

    onMutate: async (updatedTodo) => {
      // 1. 조회 결과가 낙관적 변경을 덮어쓰지 않도록 취소
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });

      // 2. 실패 시 복구할 기존 목록 백업
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // 3. 서버 응답 전에 완료 상태 변경
      queryClient.setQueryData<Todo[]>(["todos"], (currentTodos) => {
        return currentTodos?.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo,
        );
      });

      // 4. onError에서 사용할 백업 반환
      return { prevTodos };
    },

    onError: (_error, _variables, rollbackData) => {
      // 실패하면 기존 목록으로 복구
      if (rollbackData?.prevTodos !== undefined) {
        queryClient.setQueryData(["todos"], rollbackData.prevTodos);
      }
    },

    onSettled: () => {
      // 성공·실패 모두 서버 데이터와 다시 맞추기
      return queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const {
    mutate: deleteTodoMutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });

      queryClient.setQueryData<Todo[]>(["todos"], (prevTodos) => {
        return prevTodos?.filter((todo) => todo.id !== deletedId);
      });
    },
  });

  const isBusy = isUpdatePending || isDeletePending;

  return (
    <>
      {isUpdateError && <p role="alert">{updateError.message}</p>}
      {isDeleteError && <p role="alert">{deleteError.message}</p>}

      {todos.length === 0 ? (
        <p className="empty-message">아직 등록된 할 일이 없어요.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  disabled={isBusy}
                  onChange={() => {
                    if (isBusy) return;

                    updateTodoMutate({
                      id: todo.id,
                      completed: !todo.completed,
                    });
                  }}
                />

                <span className={todo.completed ? "completed" : ""}>
                  {todo.title}
                </span>
              </label>

              <button
                className="delete-button"
                type="button"
                aria-label={`${todo.title} 삭제`}
                disabled={isBusy}
                onClick={() => {
                  if (isBusy) return;

                  deleteTodoMutate(todo.id);
                }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
