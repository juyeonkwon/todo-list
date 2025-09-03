"""
간단한 데이터 모델 정의
TODO 아이템을 리스트와 딕셔너리로 간단하게 관리합니다.
"""

from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel


class TodoItem(BaseModel):
    """간단한 TODO 아이템 모델"""
    title: str
    description: str = ""


class TodoUpdate(BaseModel):
    """TODO 업데이트 모델"""
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


# 간단한 TODO 데이터 구조 (리스트 사용)
todos_list = []
next_id = 1


def create_todo_dict(title: str, description: str = "") -> Dict[str, Any]:
    """새 TODO 딕셔너리 생성"""
    global next_id
    todo = {
        "id": next_id,
        "title": title,
        "description": description,
        "completed": False,
        "createdAt": datetime.now().isoformat()
    }
    next_id += 1
    return todo


def get_all_todos() -> list:
    """모든 TODO 반환"""
    return todos_list


def get_todo_by_id(todo_id: int) -> Optional[Dict[str, Any]]:
    """ID로 TODO 찾기"""
    for todo in todos_list:
        if todo["id"] == todo_id:
            return todo
    return None


def add_todo(title: str, description: str = "") -> Dict[str, Any]:
    """새 TODO 추가"""
    new_todo = create_todo_dict(title, description)
    todos_list.append(new_todo)
    return new_todo


def update_todo(todo_id: int, **updates) -> Optional[Dict[str, Any]]:
    """TODO 업데이트"""
    todo = get_todo_by_id(todo_id)
    if todo:
        for key, value in updates.items():
            if key in todo and value is not None:
                todo[key] = value
        return todo
    return None


def delete_todo(todo_id: int) -> bool:
    """TODO 삭제"""
    global todos_list
    todos_list = [todo for todo in todos_list if todo["id"] != todo_id]
    return True


def add_sample_todos():
    """테스트용 샘플 TODO 데이터 추가"""
    sample_todos = [
        {"title": "프로젝트 계획 수립", "description": "새 프로젝트의 전체적인 계획을 수립합니다"},
        {"title": "API 문서 작성", "description": "FastAPI 문서를 작성하고 정리합니다"},
        {"title": "테스트 케이스 작성", "description": "Postman으로 API 테스트를 진행합니다"},
        {"title": "코드 리뷰", "description": "팀원들과 함께 코드 리뷰를 진행합니다"},
        {"title": "배포 준비", "description": "프로덕션 환경 배포를 위한 준비를 합니다"}
    ]
    
    for todo_data in sample_todos:
        add_todo(todo_data["title"], todo_data["description"])
    
    return f"{len(sample_todos)}개의 샘플 TODO가 추가되었습니다"


def clear_all_todos():
    """모든 TODO 삭제 (테스트용)"""
    global todos_list, next_id
    count = len(todos_list)
    todos_list.clear()
    next_id = 1
    return f"{count}개의 TODO가 삭제되었습니다"
