#!/bin/bash
# FastAPI TODO List API 테스트 스크립트
# Windows에서는 Git Bash 또는 WSL에서 실행하세요

echo "🚀 FastAPI TODO List API 테스트 시작"
echo "=================================="

BASE_URL="http://localhost:8000"

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 테스트 함수
test_request() {
    echo -e "${BLUE}$1${NC}"
    echo "----------------------------------------"
    response=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$2" "${@:3}")
    http_code=$(echo "$response" | tail -n1 | cut -d: -f2)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✅ SUCCESS (HTTP $http_code)${NC}"
    else
        echo -e "${RED}❌ FAILED (HTTP $http_code)${NC}"
    fi
    
    echo "$body" | python -m json.tool 2>/dev/null || echo "$body"
    echo ""
}

echo "1. API 상태 확인"
test_request "GET /" "$BASE_URL/"

echo "2. 빈 TODO 목록 조회"
test_request "GET /todos" "$BASE_URL/todos"

echo "3. 샘플 데이터 추가"
test_request "POST /test/sample-data" "$BASE_URL/test/sample-data" -X POST

echo "4. 전체 TODO 목록 조회"
test_request "GET /todos (after sample data)" "$BASE_URL/todos"

echo "5. 새 TODO 생성"
test_request "POST /todos" "$BASE_URL/todos" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"title": "curl로 생성한 TODO", "description": "터미널에서 생성된 할 일입니다"}'

echo "6. 특정 TODO 조회 (ID: 1)"
test_request "GET /todos/1" "$BASE_URL/todos/1"

echo "7. TODO 수정 (ID: 1을 완료로 변경)"
test_request "PUT /todos/1" "$BASE_URL/todos/1" \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '{"completed": true}'

echo "8. 완료된 TODO 조회"
test_request "GET /todos/status/true" "$BASE_URL/todos/status/true"

echo "9. 미완료 TODO 조회"
test_request "GET /todos/status/false" "$BASE_URL/todos/status/false"

echo "10. TODO 삭제 (ID: 1)"
test_request "DELETE /todos/1" "$BASE_URL/todos/1" -X DELETE

echo "11. 존재하지 않는 TODO 조회 (에러 테스트)"
test_request "GET /todos/999" "$BASE_URL/todos/999"

echo "12. 모든 데이터 삭제 (테스트 정리)"
test_request "DELETE /test/clear-all" "$BASE_URL/test/clear-all" -X DELETE

echo "=================================="
echo -e "${GREEN}🎉 API 테스트 완료!${NC}"
echo "Postman 컬렉션을 사용하면 더 자세한 테스트가 가능합니다."
