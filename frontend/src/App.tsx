import React, { useState, useEffect } from 'react';
import { Todo, NewTodo, TodoUpdate } from './types/Todo';
import { todoAPI } from './services/TodoService';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

/**
 * 간단한 TODO List 앱
 */
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 앱 시작시 TODO 목록 로드
  useEffect(() => {
    loadTodos();
  }, []);

  // TODO 목록 불러오기
  const loadTodos = async () => {
    setLoading(true);
    try {
      const todosData = await todoAPI.getAll();
      setTodos(todosData);
      setError('');
    } catch (err) {
      setError('TODO 목록을 불러올 수 없습니다.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // 새 TODO 추가 또는 기존 TODO 수정
  const handleSubmitTodo = async (todoData: NewTodo) => {
    setLoading(true);
    try {
      if (editingTodo) {
        // 수정 모드
        const updatedTodo = await todoAPI.update(editingTodo.id, todoData);
        setTodos(todos.map(todo => 
          todo.id === editingTodo.id ? updatedTodo : todo
        ));
        setEditingTodo(null);
      } else {
        // 추가 모드
        const newTodo = await todoAPI.create(todoData);
        setTodos([newTodo, ...todos]);
      }
      setError('');
    } catch (err) {
      setError('작업을 완료할 수 없습니다.');
      console.error('Error submitting todo:', err);
    } finally {
      setLoading(false);
    }
  };

  // TODO 수정 모드로 전환
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  // TODO 삭제
  const handleDeleteTodo = async (id: number) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    
    setLoading(true);
    try {
      await todoAPI.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setError('');
    } catch (err) {
      setError('TODO를 삭제할 수 없습니다.');
      console.error('Error deleting todo:', err);
    } finally {
      setLoading(false);
    }
  };

  // TODO 완료 상태 변경
  const handleToggleComplete = async (id: number, completed: boolean) => {
    setLoading(true);
    try {
      const updatedTodo = await todoAPI.update(id, { completed });
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      setError('');
    } catch (err) {
      setError('상태를 변경할 수 없습니다.');
      console.error('Error toggling todo:', err);
    } finally {
      setLoading(false);
    }
  };

  // 수정 모드 취소
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>📝 간단한 TODO List</h1>
          <p>리스트로 관리하는 할 일!</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="error-close">
              ×
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-message">
            처리 중...
          </div>
        )}

        <TodoForm
          editingTodo={editingTodo}
          onSubmit={handleSubmitTodo}
          onCancel={handleCancelEdit}
        />

        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
