"""
간단한 FastAPI TODO List 애플리케이션
리스트 자료구조를 사용한 간단한 CRUD API
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    TodoItem, TodoUpdate, todos_list, 
    get_all_todos, get_todo_by_id, add_todo, 
    update_todo, delete_todo
)

# FastAPI 앱 생성
app = FastAPI(
    title="간단한 TODO List API",
    description="리스트 자료구조를 사용한 TODO CRUD API",
    version="2.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """API 정보"""
    return {
        "message": "간단한 TODO List API",
        "version": "2.0.0",
        "total_todos": len(todos_list)
    }


@app.get("/todos")
def get_todos():
    """모든 TODO 조회"""
    return get_all_todos()


@app.get("/todos/{todo_id}")
def get_todo(todo_id: int):
    """특정 TODO 조회"""
    todo = get_todo_by_id(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="TODO를 찾을 수 없습니다")
    return todo


@app.post("/todos")
def create_todo(todo: TodoItem):
    """새 TODO 생성"""
    new_todo = add_todo(todo.title, todo.description)
    return new_todo


@app.put("/todos/{todo_id}")
def update_todo_endpoint(todo_id: int, todo_update: TodoUpdate):
    """TODO 업데이트"""
    updates = {}
    if todo_update.title is not None:
        updates["title"] = todo_update.title
    if todo_update.description is not None:
        updates["description"] = todo_update.description
    if todo_update.completed is not None:
        updates["completed"] = todo_update.completed
    
    updated_todo = update_todo(todo_id, **updates)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="TODO를 찾을 수 없습니다")
    return updated_todo


@app.delete("/todos/{todo_id}")
def delete_todo_endpoint(todo_id: int):
    """TODO 삭제"""
    todo = get_todo_by_id(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="TODO를 찾을 수 없습니다")
    
    delete_todo(todo_id)
    return {"message": "TODO가 삭제되었습니다"}


@app.get("/todos/status/{completed}")
def get_todos_by_status(completed: bool):
    """완료 상태별 TODO 조회"""
    filtered_todos = [todo for todo in todos_list if todo["completed"] == completed]
    return filtered_todos


# 테스트 전용 엔드포인트
@app.post("/test/sample-data")
def add_sample_data():
    """테스트용 샘플 데이터 추가"""
    from models import add_sample_todos
    result = add_sample_todos()
    return {"message": result, "total_todos": len(todos_list)}


@app.delete("/test/clear-all")
def clear_all_data():
    """모든 TODO 삭제 (테스트용)"""
    from models import clear_all_todos
    result = clear_all_todos()
    return {"message": result, "total_todos": len(todos_list)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
