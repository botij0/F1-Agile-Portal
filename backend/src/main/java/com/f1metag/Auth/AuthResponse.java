package com.f1metag.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    Boolean success;
    String message;
    String token;

    public static ResponseEntity<AuthResponse> badCredentials() {
        return ResponseEntity.status(401).body(AuthResponse.builder()
                .success(false)
                .message("Username or password is incorrect")
                .build());
    }

    public static ResponseEntity<AuthResponse> successLogin(String token) {
        return ResponseEntity.ok(AuthResponse.builder()
                .success(true)
                .message("Inicio de sesión exitoso")
                .token(token)
                .build());
    }

    public static ResponseEntity<AuthResponse> succesSignup(String token) {
        return ResponseEntity.ok(AuthResponse.builder()
                .success(true)
                .message("Usuario creado con éxito")
                .token(token)
                .build());
    }

    public static ResponseEntity<AuthResponse> badRequest(String message) {
        return ResponseEntity.badRequest().body(AuthResponse.builder()
                .success(false)
                .message(message)
                .build());
    }


}
