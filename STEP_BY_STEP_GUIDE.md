# 🚀 간단한 TODO List 프로젝트 단계별 구축 가이드

## 📖 개요

이 문서는 React + FastAPI를 사용한 **간단한** TODO List 프로젝트를 처음부터 단계별로 구축하는 방법을 설명합니다. 
**리스트 자료구조**를 중심으로 한 단순하고 이해하기 쉬운 구조로 되어 있어 초보자도 쉽게 따라할 수 있습니다.

## 🎯 핵심 원칙

- **단순함**: 복잡한 클래스 대신 리스트와 딕셔너리 사용
- **직관성**: 이해하기 쉬운 함수 기반 구조
- **학습 중심**: 각 단계별 명확한 설명과 프롬프트 제공

---

## 🏗️ 1단계: 프로젝트 초기 설정

### 1.1 프로젝트 디렉토리 구조 생성

**프롬프트:**
```
프로젝트 루트 디렉토리에 frontend와 backend 폴더를 생성해주세요.
```

**실행할 명령:**
```bash
mkdir frontend
mkdir backend
```

### 1.2 React 프로젝트 초기화

**프롬프트:**
```
frontend 디렉토리에 TypeScript 템플릿으로 React 프로젝트를 생성해주세요.
```

**실행할 명령:**
```bash
cd frontend
npx create-react-app . --template typescript
```

### 1.3 필요한 패키지 설치

**프롬프트:**
```
HTTP 요청을 위한 axios 패키지를 설치해주세요.
```

**실행할 명령:**
```bash
cd frontend
npm install axios
```

---

## 🎨 2단계: Frontend 타입 및 서비스 구현

### 2.1 간단한 TypeScript 타입 정의 생성

**프롬프트:**
```
src/types/Todo.ts 파일을 생성하고 간단한 타입을 정의해주세요:
- Todo 인터페이스 (id, title, description, completed, createdAt)
- NewTodo 인터페이스 (새 TODO 생성용)
- TodoUpdate 인터페이스 (업데이트용)

복잡한 클래스 구조 대신 간단한 인터페이스만 사용해주세요.
```

**생성할 파일:** `src/types/Todo.ts`

### 2.2 간단한 API 함수들 생성

**프롬프트:**
```
src/services/TodoService.ts 파일을 생성하고 간단한 API 함수들을 만들어주세요.
클래스가 아닌 객체로 함수들을 그룹화하여 다음 함수들을 포함해주세요:
- getAll() - 모든 TODO 가져오기
- getById(id) - 특정 TODO 가져오기  
- create(todo) - 새 TODO 만들기
- update(id, updates) - TODO 업데이트하기
- delete(id) - TODO 삭제하기

todoAPI.getAll() 같은 형태로 사용할 수 있도록 해주세요.
```

**생성할 파일:** `src/services/TodoService.ts`

---

## 🧩 3단계: React 컴포넌트 구현

### 3.1 TodoItem 컴포넌트 생성

**프롬프트:**
```
src/components/TodoItem.tsx와 TodoItem.css 파일을 생성해주세요.
개별 TODO 아이템을 표시하는 컴포넌트로 다음 기능이 있어야 합니다:
- 완료 상태 체크박스
- 제목과 설명 표시
- 수정/삭제 버튼
- 완료된 항목은 취소선 스타일
```

**생성할 파일:**
- `src/components/TodoItem.tsx`
- `src/components/TodoItem.css`

### 3.2 TodoForm 컴포넌트 생성

**프롬프트:**
```
src/components/TodoForm.tsx와 TodoForm.css 파일을 생성해주세요.
TODO 생성/수정을 위한 폼 컴포넌트로 다음 기능이 있어야 합니다:
- 제목 입력 필드 (필수)
- 설명 입력 필드 (선택)
- 폼 유효성 검사
- 수정 모드 지원
```

**생성할 파일:**
- `src/components/TodoForm.tsx`
- `src/components/TodoForm.css`

### 3.3 TodoList 컴포넌트 생성

**프롬프트:**
```
src/components/TodoList.tsx와 TodoList.css 파일을 생성해주세요.
TODO 목록을 표시하는 컴포넌트로 다음 기능이 있어야 합니다:
- 완료/미완료 상태별 분류 표시
- 빈 목록일 때 안내 메시지
- TodoItem 컴포넌트들을 렌더링
```

**생성할 파일:**
- `src/components/TodoList.tsx`
- `src/components/TodoList.css`

---

## 🔗 4단계: 메인 App 컴포넌트 구현

### 4.1 App.tsx 컴포넌트 수정

**프롬프트:**
```
src/App.tsx 파일을 수정하여 메인 애플리케이션 로직을 구현해주세요.
다음 기능들을 포함해야 합니다:
- TODO 목록 상태 관리
- CRUD 작업 핸들러들
- 로딩 및 에러 상태 처리
- 컴포넌트들 연결
```

### 4.2 App.css 스타일 수정

**프롬프트:**
```
src/App.css 파일을 수정하여 전체 애플리케이션의 스타일을 적용해주세요.
모던하고 반응형인 디자인으로 만들어주세요.
```

---

## ⚡ 5단계: FastAPI Backend 구현

### 5.1 Python 환경 설정

**프롬프트:**
```
backend 디렉토리에서 Python 가상환경을 설정하고 간단한 패키지들만 설치해주세요:
- fastapi
- uvicorn[standard]

복잡한 패키지는 피하고 꼭 필요한 것만 설치해주세요.
```

**실행할 명령:**
```bash
cd backend
pip install fastapi uvicorn[standard]
```

### 5.2 간단한 데이터 모델 및 함수 생성

**프롬프트:**
```
models.py 파일을 생성하고 다음을 구현해주세요:
- 간단한 Pydantic 모델들 (TodoItem, TodoUpdate)
- 메모리 내 리스트로 데이터 저장 (todos_list = [])
- 간단한 CRUD 함수들:
  - get_all_todos()
  - get_todo_by_id(id)
  - add_todo(title, description)
  - update_todo(id, **updates)
  - delete_todo(id)

클래스 대신 단순한 함수들로 구현해주세요.
```

**생성할 파일:** `models.py`

### 5.3 간단한 FastAPI 애플리케이션 생성

**프롬프트:**
```
main.py 파일을 생성하고 간단한 FastAPI 애플리케이션을 구현해주세요.
다음 기능들을 포함해야 합니다:
- CORS 설정 (React와 통신용)
- 간단한 REST API 엔드포인트들
- models.py의 함수들을 직접 호출
- 기본적인 에러 처리

복잡한 미들웨어나 고급 기능은 피하고 단순하게 만들어주세요.
```

**생성할 파일:** `main.py`

### 5.5 Requirements 파일 생성

**프롬프트:**
```
requirements.txt 파일을 생성하여 프로젝트 의존성을 명시해주세요.
```

**생성할 파일:** `requirements.txt`

---

## 🚀 6단계: 애플리케이션 실행

### 6.1 Backend 서버 시작

**프롬프트:**
```
FastAPI 서버를 실행해주세요.
```

**실행할 명령:**
```bash
cd backend
python main.py
```

**확인:** `http://localhost:8000/docs`에서 API 문서 확인

### 6.2 Frontend 개발 서버 시작

**프롬프트:**
```
React 개발 서버를 시작해주세요.
```

**실행할 명령:**
```bash
cd frontend
npm start
```

**확인:** `http://localhost:3000`에서 애플리케이션 확인

---

## 🧪 7단계: 독립적인 백엔드 테스트 환경 구축

### 7.1 테스트용 엔드포인트 추가

**프롬프트:**
```
main.py에 테스트 전용 엔드포인트를 추가해주세요:
- POST /test/sample-data: 샘플 TODO 데이터 5개 추가
- DELETE /test/clear-all: 모든 TODO 삭제 (테스트 초기화)

이 엔드포인트들은 개발과 테스트를 위한 것입니다.
```

### 7.2 Postman 테스트 컬렉션 생성

**프롬프트:**
```
Postman에서 사용할 수 있는 API 테스트 컬렉션을 만들어주세요:
- 모든 CRUD 엔드포인트 테스트
- 에러 케이스 테스트 (404, 422)
- 테스트용 엔드포인트 포함
- 환경 변수 설정 파일도 포함

JSON 파일 형태로 생성해주세요.
```

**생성할 파일:**
- `postman_collection.json`
- `postman_environment.json` 
- `POSTMAN_TEST_GUIDE.md`

### 7.3 자동화 테스트 스크립트 생성

**프롬프트:**
```
PowerShell과 Bash 스크립트로 API를 자동 테스트할 수 있는 스크립트를 만들어주세요:
- 모든 엔드포인트 순차 테스트
- 성공/실패 결과 표시
- 색상으로 결과 구분
- Windows(PowerShell)와 Linux/Mac(Bash) 버전 모두

파일명: test_api.ps1, test_api.sh
```

### 7.4 검증 오류 가이드 생성

**프롬프트:**
```
FastAPI의 Validation Error에 대한 설명 문서를 만들어주세요:
- Pydantic 검증이 어떻게 작동하는지
- 언제 422 에러가 발생하는지  
- 실제 테스트 예시들
- 일반적인 에러 타입들

개발자가 API 검증 에러를 이해할 수 있도록 도와주세요.
```

---

## 📝 8단계: 최종 문서화 및 정리

### 8.1 통합 문서 업데이트

**프롬프트:**
```
모든 문서를 최종 완성된 프로젝트에 맞게 업데이트해주세요:
- README.md: 테스트 환경 정보 추가
- 프로젝트 구조에 테스트 파일들 포함
- 실행 방법에 테스트 가이드 추가
```

### 8.2 전체 파일 목록 정리

**최종 완성된 파일 구조:**
```
react_fastapi/
├── frontend/               # React 앱
├── backend/               # FastAPI 서버
│   ├── main.py           # API 엔드포인트
│   ├── models.py         # 데이터 모델 & 함수
│   ├── requirements.txt  # 의존성
│   ├── postman_*.json    # Postman 테스트
│   ├── test_api.*        # 자동화 테스트
│   └── *_GUIDE.md        # 가이드 문서들
├── README.md             # 메인 문서
├── STEP_BY_STEP_GUIDE.md # 구축 가이드
└── SIMPLE_PROJECT_GUIDE.md # 설계 철학
```

---

## 🧠 핵심 학습 포인트

### Backend 구현시 주의사항
1. **클래스보다 함수 우선**: 복잡한 클래스 구조 대신 간단한 함수 사용
2. **리스트 직접 조작**: ORM이나 복잡한 데이터 레이어 없이 Python 리스트 직접 사용
3. **최소한의 의존성**: 꼭 필요한 패키지만 설치 (fastapi, uvicorn만으로도 충분)

### Frontend 구현시 주의사항
1. **타입 정의 단순화**: 복잡한 제네릭이나 고급 타입 기능 피하기
2. **API 호출 패턴화**: 일관된 에러 처리와 로딩 상태 관리
3. **컴포넌트 분리**: 각 컴포넌트는 하나의 명확한 역할만 담당

### 디버깅 팁
1. **브라우저 개발자 도구**: Network 탭에서 API 호출 확인
2. **FastAPI 자동 문서**: `http://localhost:8000/docs`에서 API 테스트
3. **콘솔 로그 활용**: 데이터 흐름 추적을 위한 console.log 적극 활용

---

## 🎯 단계별 프롬프트 템플릿

### 새 컴포넌트 생성시

```
[컴포넌트명] 컴포넌트를 간단하게 생성해주세요.
파일 위치: src/components/[컴포넌트명].tsx
기능: [구체적인 기능 설명]
Props: [필요한 props 목록]
스타일: 간단하고 깔끔한 디자인
복잡한 로직은 피하고 단순하게 만들어주세요.
```

### API 함수 추가시

```
todoAPI 객체에 [기능명] 함수를 추가해주세요.
HTTP 메서드: [GET/POST/PUT/DELETE]
경로: /[경로]
파라미터: [파라미터 설명]
기능: [구체적인 기능 설명]
클래스가 아닌 간단한 함수로 만들어주세요.
```

### Backend 함수 추가시

```
models.py에 [기능명] 함수를 추가해주세요.
기능: [구체적인 기능 설명]
파라미터: [파라미터 목록]
반환값: [반환값 설명]
todos_list를 직접 조작하는 간단한 함수로 만들어주세요.
```

### 스타일 수정시

```
[컴포넌트/파일명]의 CSS 스타일을 수정해주세요.
요구사항:
- [구체적인 스타일 요구사항 1]
- [구체적인 스타일 요구사항 2]
- 반응형 디자인 적용
```

---

## 🔧 트러블슈팅 가이드

### 일반적인 문제와 해결 프롬프트

#### CORS 오류
```
React 앱에서 FastAPI 서버로 요청시 CORS 오류가 발생합니다. 
FastAPI의 CORS 설정을 확인하고 수정해주세요.
```

#### 포트 충돌
```
[포트번호] 포트가 이미 사용 중입니다. 
다른 포트로 변경하거나 기존 프로세스를 종료하는 방법을 알려주세요.
```

#### 패키지 설치 오류
```
[패키지명] 설치 중 오류가 발생했습니다. 
원인을 파악하고 해결 방법을 제시해주세요.
```

---

## 📋 체크리스트

### Frontend 완성 체크리스트
- [ ] TypeScript 타입 정의 완료 (Todo, NewTodo, TodoUpdate)
- [ ] API 서비스 객체 구현 (todoAPI)
- [ ] TodoItem 컴포넌트 구현
- [ ] TodoForm 컴포넌트 구현  
- [ ] TodoList 컴포넌트 구현
- [ ] App 컴포넌트 통합
- [ ] CSS 스타일링 완료
- [ ] 에러 처리 구현

### Backend 완성 체크리스트
- [ ] 간단한 Pydantic 모델 정의
- [ ] CRUD 함수들 구현 (리스트 기반)
- [ ] FastAPI 엔드포인트 구현
- [ ] CORS 설정 완료
- [ ] 에러 핸들링 구현
- [ ] 테스트용 엔드포인트 추가
- [ ] API 문서화 확인

### 테스트 환경 완성 체크리스트
- [ ] Postman 컬렉션 생성
- [ ] Postman 환경 설정 파일 생성
- [ ] PowerShell 테스트 스크립트 작성
- [ ] Bash 테스트 스크립트 작성
- [ ] 테스트 가이드 문서 작성
- [ ] Validation Error 가이드 작성

### 통합 테스트 체크리스트
- [ ] Frontend-Backend 통신 확인
- [ ] CRUD 기능 모두 동작
- [ ] 에러 상황 처리 확인
- [ ] UI/UX 정상 동작
- [ ] 반응형 디자인 확인
- [ ] Postman 테스트 모두 통과
- [ ] 자동화 스크립트 정상 실행

---

## 🎉 마무리

이 가이드를 따라하면 완전한 풀스택 TODO List 애플리케이션을 구축할 수 있습니다. 각 단계에서 제시된 프롬프트를 그대로 사용하거나 프로젝트 요구사항에 맞게 수정하여 활용하세요.

**추가 기능 구현시 활용할 수 있는 프롬프트:**
- "TODO에 카테고리 기능을 간단하게 추가해주세요 (리스트에 category 필드 추가)"
- "마감일 설정 기능을 간단하게 구현해주세요"
- "제목으로 검색하는 간단한 기능을 추가해주세요"
- "TODO 개수를 표시하는 간단한 기능을 구현해주세요"

모든 기능은 **단순함**을 유지하며 리스트 자료구조를 활용하여 구현하세요.
