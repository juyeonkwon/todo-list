# 📝 간단한 TODO List - React + FastAPI

## 📖 개요
React와 FastAPI로 구현한 간단한 TODO List 애플리케이션입니다.  
데이터는 **리스트 자료구조**로 관리하며, 직관적이고 학습하기 쉬운 구조를 지향합니다.

---

## 🛠 기술 스택
**Frontend**
- React 18 (TypeScript)
- Axios (HTTP Client)
- CSS3 (Custom Styling)

**Backend**
- FastAPI (Python)
- Uvicorn (ASGI Server)
- 메모리 내 리스트 저장 (DB 미사용)

---

## ✨ 특징
- ✅ **간단한 구조**: 리스트/딕셔너리 기반 CRUD  
- ✅ **메모리 저장**: 데이터베이스 없이 동작  
- ✅ **직관적 API**: RESTful 구조, 자동 문서화 제공  
- ✅ **학습 친화적**: 초보자도 이해하기 쉬운 설계  

---

## 🏗 프로젝트 구조


```
react_fastapi/
├── 📁 frontend/                 # React 애플리케이션
│   ├── 📁 src/
│   │   ├── 📁 components/      # React 컴포넌트
│   │   │   ├── TodoItem.tsx    # 개별 TODO 아이템
│   │   │   ├── TodoForm.tsx    # TODO 생성/수정 폼
│   │   │   └── TodoList.tsx    # TODO 목록
│   │   ├── 📁 services/        # 간단한 API 함수들
│   │   │   └── TodoService.ts  # todoAPI 객체
│   │   ├── 📁 types/           # TypeScript 타입 정의
│   │   │   └── Todo.ts         # Todo, NewTodo, TodoUpdate
│   │   └── App.tsx             # 메인 앱 컴포넌트
│   └── package.json
│
├── 📁 backend/                  # FastAPI 서버
│   ├── main.py                 # FastAPI 애플리케이션 + 엔드포인트
│   ├── models.py               # 간단한 데이터 모델 & CRUD 함수들
│   ├── requirements.txt        # Python 패키지 의존성
│   │
│   ├── 📋 테스트 파일들
│   ├── postman_collection.json      # Postman 테스트 컬렉션
│   ├── postman_environment.json     # Postman 환경 설정
│   ├── POSTMAN_TEST_GUIDE.md        # 상세 테스트 가이드
│   ├── VALIDATION_ERROR_GUIDE.md    # 검증 오류 설명
│   ├── test_api.ps1                 # Windows 테스트 스크립트
│   └── test_api.sh                  # Linux/Mac 테스트 스크립트
│
├── 📚 문서 파일들
├── README.md                        # 프로젝트 메인 설명서
├── STEP_BY_STEP_GUIDE.md           # 단계별 구축 가이드
└── SIMPLE_PROJECT_GUIDE.md         # 간단한 구조 철학 설명
```


---

## 🚀 실행 방법

### 1. 요구사항
- Node.js 16+  
- Python 3.8+

### 2. Backend 실행
```bash
cd backend
pip install -r requirements.txt
python main.py


```bash
# 백엔드 디렉토리로 이동
cd backend

# 필요한 패키지 설치 (최소한만)
pip install fastapi uvicorn[standard]

# 또는 requirements.txt 사용
pip install -r requirements.txt

# FastAPI 서버 시작
python main.py
```

- 서버: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 3. Frontend 실행

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# Node.js 의존성 설치
npm install

# React 개발 서버 시작
npm start
```

- 클라이언트: `http://localhost:3000`


---

## 📋 주요 기능

### ✨ Frontend 기능

1. **간단한 TODO 관리**
   - 제목과 설명 입력으로 TODO 생성
   - 완료/미완료 상태 토글
   - 수정 및 삭제 기능

2. **직관적인 UI**
   - 진행 중/완료됨 상태별 분류 표시
   - 반응형 디자인
   - 간단하고 깔끔한 인터페이스

3. **에러 처리**
   - 로딩 상태 표시
   - 에러 메시지 알림
   - 사용자 친화적 피드백

### ⚡ Backend API

| 메서드    | 엔드포인트                  | 설명                  |
| ------ | ---------------------- | ------------------- |
| GET    | `/`                    | API 상태 및 TODO 개수 확인 |
| GET    | `/todos`               | 모든 TODO 조회          |
| GET    | `/todos/{id}`          | 특정 TODO 조회          |
| POST   | `/todos`               | 새 TODO 생성           |
| PUT    | `/todos/{id}`          | TODO 수정             |
| DELETE | `/todos/{id}`          | TODO 삭제             |
| GET    | `/todos/status/{done}` | 완료/미완료 TODO 조회      |
| POST   | `/test/sample-data`    | 샘플 TODO 5개 추가       |
| DELETE | `/test/clear-all`      | 모든 TODO 삭제          |


### 📊 간단한 데이터 구조

```python
# Backend에서 사용하는 TODO 구조 (Python 딕셔너리)
todo = {
    "id": 1,
    "title": "할 일 제목",
    "description": "할 일 설명",
    "completed": False,
    "createdAt": "2025-09-02T10:00:00"
}

# 모든 TODO는 리스트에 저장
todos_list = [todo1, todo2, todo3, ...]
```

```typescript
// Frontend에서 사용하는 TODO 타입 (TypeScript)
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}
```

---

## 🔧 테스트 방법

#### **1. Postman 컬렉션**
```bash
backend/postman_collection.json
backend/postman_environment.json
```

#### **2. PowerShell (Windows)**
```powershell
cd backend
./test_api.ps1
```

#### **3. Bash (Linux/Mac/WSL)**
```bash
cd backend
chmod +x test_api.sh
./test_api.sh
```

#### **4. 수동(curl) 테스트**
```bash
# API 상태 확인
curl http://localhost:8000/

# 샘플 데이터 추가
curl -X POST http://localhost:8000/test/sample-data

# TODO 목록 조회
curl http://localhost:8000/todos
```

### 테스트 전용 엔드포인트

개발 및 테스트를 위한 특별한 엔드포인트들:
- `POST /test/sample-data` - 5개의 샘플 TODO 추가
- `DELETE /test/clear-all` - 모든 TODO 삭제 (테스트 초기화)

---

## 🎯 향후 개선 사항

1. **데이터 영속화**
   - 현재는 메모리 내 리스트 사용 (서버 재시작시 데이터 손실)
   - 파일 저장 (JSON) 또는 SQLite 데이터베이스 연동

2. **기능 확장**
   - 카테고리/태그 시스템
   - 마감일 설정
   - 우선순위 설정
   - 검색 및 필터링

3. **사용자 경험 개선**
   - 드래그 앤 드롭으로 순서 변경
   - 키보드 단축키 지원
   - 다크 모드 테마

4. **기술적 개선**
   - 상태 관리 라이브러리 (Redux, Zustand)
   - 테스트 코드 작성
   - Docker 컨테이너화

---

## 🎓 학습 포인트

이 프로젝트는 다음을 학습할 수 있도록 설계되었습니다:

### **Frontend (React)**
- 함수형 컴포넌트와 Hooks 사용법
- TypeScript를 활용한 타입 안전성
- axios를 이용한 HTTP 통신
- 컴포넌트 간 props 전달

### **Backend (FastAPI)**
- RESTful API 설계 및 구현
- Python 리스트와 딕셔너리를 활용한 데이터 관리
- CORS 설정 및 클라이언트-서버 통신
- 간단한 에러 처리

### **Full Stack 개발**
- Frontend와 Backend 간 데이터 흐름 이해
- API 설계 및 문서화
- 개발 환경 구성

---

## 🐛 문제 해결

### 일반적인 문제

1. **CORS 오류**
   - Backend의 CORS 설정 확인
   - Frontend URL이 허용 목록에 있는지 확인

2. **포트 충돌**
   - Frontend: 3000번 포트
   - Backend: 8000번 포트
   - 다른 프로세스가 사용 중인지 확인

3. **의존성 설치 실패**
   - Node.js/Python 버전 확인
   - 캐시 정리 후 재설치

---

## 📄 라이선스

이 프로젝트는 개인 학습 기록용으로 제작되었습니다.
