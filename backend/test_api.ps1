# FastAPI TODO List API 테스트 스크립트 (PowerShell)
# Windows PowerShell에서 실행하세요

Write-Host "🚀 FastAPI TODO List API 테스트 시작" -ForegroundColor Blue
Write-Host "=================================="

$BaseUrl = "http://localhost:8000"

# 테스트 함수
function Test-Request {
    param(
        [string]$Description,
        [string]$Method,
        [string]$Url,
        [string]$Body = $null
    )
    
    Write-Host "`n$Description" -ForegroundColor Cyan
    Write-Host "----------------------------------------"
    
    try {
        $headers = @{"Content-Type" = "application/json"}
        
        if ($Body) {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers
        }
        
        Write-Host "✅ SUCCESS" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 3
    }
    catch {
        Write-Host "❌ FAILED" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)"
        }
    }
}

# 테스트 실행
Test-Request "1. API 상태 확인" "GET" "$BaseUrl/"

Test-Request "2. 빈 TODO 목록 조회" "GET" "$BaseUrl/todos"

Test-Request "3. 샘플 데이터 추가" "POST" "$BaseUrl/test/sample-data"

Test-Request "4. 전체 TODO 목록 조회" "GET" "$BaseUrl/todos"

$newTodoJson = @"
{
    "title": "PowerShell로 생성한 TODO",
    "description": "PowerShell 스크립트에서 생성된 할 일입니다"
}
"@

Test-Request "5. 새 TODO 생성" "POST" "$BaseUrl/todos" $newTodoJson

Test-Request "6. 특정 TODO 조회 (ID: 1)" "GET" "$BaseUrl/todos/1"

$updateTodoJson = @"
{
    "completed": true
}
"@

Test-Request "7. TODO 수정 (ID: 1을 완료로 변경)" "PUT" "$BaseUrl/todos/1" $updateTodoJson

Test-Request "8. 완료된 TODO 조회" "GET" "$BaseUrl/todos/status/true"

Test-Request "9. 미완료 TODO 조회" "GET" "$BaseUrl/todos/status/false"

Test-Request "10. TODO 삭제 (ID: 1)" "DELETE" "$BaseUrl/todos/1"

Test-Request "11. 존재하지 않는 TODO 조회 (에러 테스트)" "GET" "$BaseUrl/todos/999"

Test-Request "12. 모든 데이터 삭제 (테스트 정리)" "DELETE" "$BaseUrl/test/clear-all"

Write-Host "`n=================================="
Write-Host "🎉 API 테스트 완료!" -ForegroundColor Green
Write-Host "더 자세한 테스트는 Postman 컬렉션을 사용하세요."
