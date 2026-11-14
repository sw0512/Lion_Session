import type { Todo } from "../types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("http://localhost:3000/todos");

  if (!response.ok) {
    throw new Error("할 일 목록을 불러오지 못했습니다.");
  }

  return response.json();
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });

  if (!response.ok) {
    throw new Error("할 일을 추가하지 못했습니다.");
  }

  return response.json();
};
// id는 서버가 생성하므로 보내지 않음 !

export const updateTodo = async ({
  id,
  completed,
}: Pick<Todo, "id" | "completed">): Promise<Todo> => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("완료 상태를 변경하지 못했습니다.");
  }

  return response.json();
};

export const deleteTodo = async (id: string): Promise<string> => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("할 일을 삭제하지 못했습니다.");
  }

  return id;
};
