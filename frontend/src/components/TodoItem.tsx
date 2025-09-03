import React from 'react';
import { Todo } from '../types/Todo';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

/**
 * 개별 TODO 아이템을 표시하는 컴포넌트
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  const handleToggleComplete = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 TODO를 삭제하시겠습니까?')) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
          />
        </div>
        <div className="todo-details">
          <h3 className="todo-title">{todo.title}</h3>
          <p className="todo-description">{todo.description}</p>
          <small className="todo-date">
            생성일: {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
          </small>
        </div>
      </div>
      <div className="todo-actions">
        <button className="edit-btn" onClick={handleEdit}>
          수정
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
