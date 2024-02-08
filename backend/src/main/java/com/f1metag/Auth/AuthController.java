package com.f1metag.Auth;

import com.f1metag.Common.Requests.LoginRequest;
import com.f1metag.Common.Requests.SignUpRequest;
import com.f1metag.Common.Responses.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;



    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.ok(authService.login(loginRequest));
        }
       catch (BadCredentialsException e) {
            return AuthResponse.badCredentials();
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.OK).body(AuthResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignUpRequest signUpRequest) {
       try {
           return ResponseEntity.ok(authService.signup(signUpRequest));
         } catch (IllegalArgumentException e) {
              return ResponseEntity.status(HttpStatus.OK).body(AuthResponse.builder()
                     .success(false)
                     .message(e.getMessage())
                     .build());
       }
    }

    @PostMapping("/verificarToken")
    public ResponseEntity<AuthResponse> verificarToken(@RequestHeader("Authorization") String auth, @RequestBody Long id){
        return ResponseEntity.ok(authService.validarToken(auth, id));
    }
}
