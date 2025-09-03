/**
 * 간단한 TODO 타입 정의 (리스트 기반)
 */

// 기본 TODO 타입
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

// 새 TODO 생성시 사용할 타입
export interface NewTodo {
  title: string;
  description: string;
}

// TODO 업데이트시 사용할 타입  
export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}
