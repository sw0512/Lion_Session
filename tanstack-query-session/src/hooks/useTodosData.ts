import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todo";

export const useTodosData = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 30,
    // 과제: 폴링으로 서버 목록을 10초마다 자동 동기화합니다.
    refetchInterval: 1000 * 10,
  });
};
