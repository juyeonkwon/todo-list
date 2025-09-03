import React, { useState, useEffect } from 'react';
import { Todo, NewTodo } from '../types/Todo';
import './TodoForm.css';

interface TodoFormProps {
  editingTodo?: Todo | null;
  onSubmit: (todo: NewTodo) => void;
  onCancel: () => void;
}

/**
 * 간단한 TODO 폼 컴포넌트
 */
const TodoForm: React.FC<TodoFormProps> = ({ editingTodo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 수정 모드일 때 폼 초기화
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요!');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    // 새 TODO 추가 후 폼 초기화
    if (!editingTodo) {
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onCancel();
  };

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <h2>{editingTodo ? 'TODO 수정' : '새 TODO 추가'}</h2>
        
        <div className="form-group">
          <label htmlFor="title">제목 *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="TODO 제목을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="TODO 설명을 입력하세요 (선택사항)"
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {editingTodo ? '수정' : '추가'}
          </button>
          {editingTodo && (
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
