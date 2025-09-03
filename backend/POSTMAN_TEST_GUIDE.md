# 📮 Postman을 이용한 FastAPI 테스트 가이드

## 🚀 시작하기 전에

### 1. FastAPI 서버 실행
```bash
cd backend
python main.py
```
서버가 `http://localhost:8000`에서 실행되는지 확인하세요.

### 2. Postman 설치
- [Postman 다운로드](https://www.postman.com/downloads/)
- 또는 웹 버전 사용: [Postman Web](https://web.postman.co/)

## 📂 Postman 컬렉션 가져오기

### 방법 1: 컬렉션 파일 임포트
1. Postman 실행
2. 좌측 상단 **Import** 버튼 클릭
3. `postman_collection.json` 파일 선택
4. **Import** 클릭

### 방법 2: 환경 설정 추가
1. 좌측 사이드바에서 **Environments** 클릭
2. **Import** 버튼 클릭
3. `postman_environment.json` 파일 선택
4. **Import** 클릭
5. 우측 상단에서 "TODO API 환경" 선택

## 🚀 빠른 테스트 실행

### PowerShell로 빠른 테스트 (Windows)
```powershell
cd backend
./test_api.ps1
```

### Bash로 빠른 테스트 (Linux/Mac/WSL)
```bash
cd backend
chmod +x test_api.sh
./test_api.sh
```

### 수동 테스트 (curl 예시)
```bash
# 1. API 상태 확인
curl http://localhost:8000/

# 2. 샘플 데이터 추가
curl -X POST http://localhost:8000/test/sample-data

# 3. TODO 목록 조회
curl http://localhost:8000/todos

# 4. 새 TODO 생성
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "테스트 TODO", "description": "테스트입니다"}'
```

## 🧪 테스트 시나리오

### 📋 기본 테스트 흐름

#### 1️⃣ API 상태 확인
```
GET http://localhost:8000/
```
**예상 응답:**
```json
{
  "message": "간단한 TODO List API",
  "version": "2.0.0",
  "total_todos": 0
}
```

#### 2️⃣ 빈 TODO 목록 확인
```
GET http://localhost:8000/todos
```
**예상 응답:**
```json
[]
```

#### 3️⃣ 첫 번째 TODO 생성
```
POST http://localhost:8000/todos
Content-Type: application/json

{
  "title": "첫 번째 할 일",
  "description": "이것은 테스트용 TODO입니다"
}
```
**예상 응답:**
```json
{
  "id": 1,
  "title": "첫 번째 할 일",
  "description": "이것은 테스트용 TODO입니다",
  "completed": false,
  "createdAt": "2025-09-02T10:30:00.000000"
}
```

#### 4️⃣ 두 번째 TODO 생성
```
POST http://localhost:8000/todos
Content-Type: application/json

{
  "title": "두 번째 할 일",
  "description": "또 다른 테스트 TODO"
}
```

#### 5️⃣ 모든 TODO 조회
```
GET http://localhost:8000/todos
```
**예상 응답:** 2개의 TODO가 들어있는 배열

#### 6️⃣ 특정 TODO 조회
```
GET http://localhost:8000/todos/1
```

#### 7️⃣ TODO 수정 (부분 업데이트)
```
PUT http://localhost:8000/todos/1
Content-Type: application/json

{
  "completed": true
}
```

#### 8️⃣ TODO 전체 수정
```
PUT http://localhost:8000/todos/1
Content-Type: application/json

{
  "title": "수정된 제목",
  "description": "수정된 설명",
  "completed": false
}
```

#### 9️⃣ 완료 상태별 조회
```
GET http://localhost:8000/todos/status/true   # 완료된 TODO
GET http://localhost:8000/todos/status/false  # 미완료 TODO
```

#### 🔟 TODO 삭제
```
DELETE http://localhost:8000/todos/1
```

## ❌ 에러 테스트

### 404 에러 테스트
```
GET http://localhost:8000/todos/999
```
**예상 응답:**
```json
{
  "detail": "TODO를 찾을 수 없습니다"
}
```

### 잘못된 데이터 테스트
```
POST http://localhost:8000/todos
Content-Type: application/json

{
  "title": ""
}
```

## 🎯 고급 테스트 시나리오

### 시나리오 1: 완전한 CRUD 테스트
1. ✅ **Create**: 새 TODO 3개 생성
2. ✅ **Read**: 전체 목록 조회, 개별 조회
3. ✅ **Update**: 각각 다른 방식으로 수정
4. ✅ **Delete**: 하나씩 삭제 후 목록 확인

### 시나리오 2: 상태 관리 테스트
1. 미완료 TODO 5개 생성
2. 일부를 완료로 변경
3. 완료/미완료 상태별 조회 테스트
4. 전체 목록에서 상태 확인

### 시나리오 3: 데이터 검증 테스트
1. 빈 제목으로 TODO 생성 시도
2. 존재하지 않는 ID로 조회/수정/삭제 시도
3. 잘못된 JSON 형식 전송
4. 잘못된 HTTP 메서드 사용

## 📊 Postman 테스트 스크립트

각 요청에 다음과 같은 테스트 스크립트를 추가할 수 있습니다:

### 1. 상태 코드 검증
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

### 2. 응답 시간 검증
```javascript
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});
```

### 3. JSON 구조 검증
```javascript
pm.test("Response has correct structure", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('title');
    pm.expect(jsonData).to.have.property('completed');
});
```

### 4. TODO 생성 후 ID 저장
```javascript
pm.test("TODO created successfully", function () {
    var jsonData = pm.response.json();
    pm.environment.set("todo_id", jsonData.id);
});
```

### 5. 저장된 ID 사용
요청 URL에서 `{{todo_id}}` 변수 사용 가능

## 🔄 자동화된 테스트 실행

### Collection Runner 사용
1. 컬렉션 우클릭 → **Run collection**
2. 실행할 요청들 선택
3. **Run** 클릭
4. 결과 확인

### 순서대로 실행할 테스트 목록
1. API 상태 확인
2. 빈 목록 조회
3. TODO 생성 (3개)
4. 전체 목록 조회
5. 개별 조회
6. 수정 테스트
7. 상태별 조회
8. 삭제 테스트
9. 에러 케이스 테스트

## 💡 팁 & 트러블슈팅

### 일반적인 문제
1. **서버가 실행되지 않음**: `python main.py` 명령어로 서버 시작
2. **CORS 에러**: FastAPI의 CORS 설정 확인
3. **포트 충돌**: 8000번 포트가 사용 중인지 확인

### Postman 사용 팁
1. **환경 변수 활용**: `{{base_url}}` 등의 변수로 URL 관리
2. **Pre-request Script**: 요청 전 데이터 준비
3. **Tests 탭**: 응답 검증 로직 작성
4. **Collection Variables**: 테스트 간 데이터 공유

## 📈 테스트 결과 예시

```
✅ API 상태 확인 - PASS
✅ 모든 TODO 조회 - PASS  
✅ TODO 생성 - PASS
✅ 특정 TODO 조회 - PASS
✅ TODO 수정 - PASS
✅ TODO 삭제 - PASS
❌ 존재하지 않는 TODO 조회 - PASS (404 에러 정상)
```

이제 Postman으로 FastAPI 백엔드를 완전히 테스트할 수 있습니다! 🎉
