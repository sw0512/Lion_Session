import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todo";
import type { Todo } from "../types/todo";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      setTitle("");

      queryClient.setQueryData<Todo[]>(["todos"], (prevTodos) => {
        return [...(prevTodos ?? []), newTodo];
      });
    },
  });

  return (
    <form
      className="todo-form"
      onSubmit={(event) => {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle || isPending) return;

        mutate(trimmedTitle);
      }}
    >
      <label className="sr-only" htmlFor="todo-title">
        새로운 할 일
      </label>

      <input
        id="todo-title"
        name="title"
        type="text"
        placeholder="오늘 할 일을 입력하세요"
        autoComplete="off"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isPending}
      />

      <button type="submit" disabled={isPending || !title.trim()}>
        {isPending ? "추가 중..." : "추가"}
      </button>

      {isError && <p role="alert">{error.message}</p>}
    </form>
  );
}
