package com.f1metag.Common.Responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.net.CacheRequest;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    Boolean success;
    String message;
    Object data;

    public static ResponseEntity<ApiResponse> badRequest() {
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .success(false)
                .message("Bad request")
                .build());
    }

    public static ResponseEntity<ApiResponse> successRequest(String message, Object data) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message(message)
                .data(data)
                .build());
    }

    public static ResponseEntity<ApiResponse> errorRequest(String message) {
        return ResponseEntity.status(401).body(ApiResponse.builder()
                .success(false)
                .message(message)
                .build());
    }


}
