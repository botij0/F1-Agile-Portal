package com.f1metag.Usuario.Controllers;


import com.f1metag.Auth.AuthService;
import com.f1metag.Usuario.Models.Usuario;
import com.f1metag.Usuario.Services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor

public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    AuthService authService;

    @GetMapping
    public ArrayList<Usuario> getUsers() {
        return usuarioService.getAllUsers();
    }

    @GetMapping("/me")
    public Usuario currentUser() {
        return usuarioService.getAuthenticatedUser();
    }

}
