package com.f1metag.Auth;

import com.f1metag.Common.Config.Jwt.JwtService;
import com.f1metag.Common.Requests.LoginRequest;
import com.f1metag.Common.Requests.SignUpRequest;
import com.f1metag.Common.Responses.AuthResponse;
import com.f1metag.Usuario.Models.Rol;
import com.f1metag.Usuario.Models.Usuario;
import com.f1metag.Usuario.Repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private static final int MIN_PASSWORD_LENGTH = 8;

    private void validateSignUpRequest(SignUpRequest signUpRequest){
        if (signUpRequest.getUsername() == null || signUpRequest.getUsername().isEmpty() ||
                signUpRequest.getEmail() == null || signUpRequest.getEmail().isEmpty() ||
                signUpRequest.getPassword() == null || signUpRequest.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Los campos username, email y password son obligatorios.");
        }
    }

    public AuthResponse signup(SignUpRequest signUpRequest) {

        validateSignUpRequest(signUpRequest);

        Usuario usuario = Usuario.builder()
                .nombre(signUpRequest.getName())
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .estado(false)
                .rol(Rol.USUARIO)
                .build();

        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un usuario con ese username.");
        }

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un usuario con ese email.");
        }

        if (usuario.getPassword().length() < MIN_PASSWORD_LENGTH) {
            throw new IllegalArgumentException("La contraseña debe tener al menos + " + MIN_PASSWORD_LENGTH + " caracteres.");
        }


        usuarioRepository.save(usuario);


        return AuthResponse.succesSignup(jwtService.getToken(usuario)).getBody();

    }


    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        UserDetails usuario = usuarioRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
        String token = jwtService.getToken(usuario);
        return AuthResponse.successLogin(token).getBody();
    }





}
