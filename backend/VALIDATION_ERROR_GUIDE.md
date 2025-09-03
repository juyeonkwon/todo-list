# 🚨 FastAPI Validation Error 테스트 가이드

## Validation Error가 발생하는 경우들

### 1. 필수 필드 누락
```bash
# 제목(title) 없이 TODO 생성 시도
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{}'
```

**예상 응답:**
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "missing"
    }
  ]
}
```

### 2. 잘못된 데이터 타입
```bash
# completed 필드에 문자열 대신 boolean이 아닌 값
curl -X PUT http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": "yes"}'
```

**예상 응답:**
```json
{
  "detail": [
    {
      "loc": ["body", "completed"],
      "msg": "value could not be parsed to a boolean",
      "type": "type_error.bool"
    }
  ]
}
```

### 3. 잘못된 JSON 형식
```bash
# 잘못된 JSON 문법
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "테스트"'  # 닫는 괄호 누락
```

## Postman에서 테스트하기

### 테스트 1: 빈 객체 전송
- **Method**: POST
- **URL**: `{{base_url}}/todos`
- **Body**: 
```json
{}
```

### 테스트 2: 잘못된 타입
- **Method**: PUT  
- **URL**: `{{base_url}}/todos/1`
- **Body**:
```json
{
  "completed": "maybe"
}
```

### 테스트 3: 유효하지 않은 필드
- **Method**: POST
- **URL**: `{{base_url}}/todos`
- **Body**:
```json
{
  "title": "테스트",
  "invalid_field": "이 필드는 존재하지 않습니다"
}
```

## 일반적인 Validation Error 타입들

1. **`missing`**: 필수 필드가 누락됨
2. **`type_error`**: 데이터 타입이 맞지 않음
3. **`value_error`**: 값이 유효하지 않음
4. **`json_invalid`**: JSON 형식이 잘못됨

## 이 오류가 발생하는 이유

FastAPI는 Pydantic을 사용해서 들어오는 데이터를 자동으로 검증합니다.
우리 모델에서:

```python
class TodoItem(BaseModel):
    title: str          # 필수 문자열
    description: str = ""  # 선택적 문자열 (기본값 있음)

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None  
    completed: Optional[bool] = None
```

이 규칙에 맞지 않는 데이터가 오면 자동으로 422 Validation Error가 발생합니다.
