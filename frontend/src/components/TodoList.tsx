import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

/**
 * TODO 목록을 표시하는 컴포넌트
 */
const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <div className="empty-state">
          <h3>할 일이 없습니다!</h3>
          <p>새로운 TODO를 추가해보세요.</p>
        </div>
      </div>
    );
  }

  // 완료되지 않은 TODO와 완료된 TODO로 분리
  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list">
      {incompleteTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">
            진행 중 ({incompleteTodos.length})
          </h3>
          {incompleteTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">
            완료됨 ({completedTodos.length})
          </h3>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
