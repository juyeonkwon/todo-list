import axios from 'axios';
import { Todo, NewTodo, TodoUpdate } from '../types/Todo';

// API 기본 URL
const API_URL = 'http://localhost:8000';

// 간단한 API 함수들
export const todoAPI = {
  // 모든 TODO 가져오기
  getAll: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },

  // 특정 TODO 가져오기
  getById: async (id: number): Promise<Todo> => {
    const response = await axios.get(`${API_URL}/todos/${id}`);
    return response.data;
  },

  // 새 TODO 만들기
  create: async (todo: NewTodo): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
  },

  // TODO 업데이트하기
  update: async (id: number, updates: TodoUpdate): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/todos/${id}`, updates);
    return response.data;
  },

  // TODO 삭제하기
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
  },

  // 완료 상태별 TODO 가져오기
  getByStatus: async (completed: boolean): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos/status/${completed}`);
    return response.data;
  }
};
