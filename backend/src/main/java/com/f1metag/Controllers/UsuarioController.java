package com.f1metag.Controllers;


import com.f1metag.Entities.Usuario;
import com.f1metag.Services.ServiceUsuario;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsuarioController {

    ServiceUsuario se1;

    public UsuarioController(ServiceUsuario se1) {
        this.se1 = se1;
    }

    @GetMapping("/usuarios")
    public List<Usuario> getAll() {
        return  this.se1.getAll();
    }
    @PostMapping("/signup")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        if (usuario.getUsername() == null || usuario.getUsername().isEmpty() ||
                usuario.getEmail() == null || usuario.getEmail().isEmpty() ||
                usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
            throw new IllegalArgumentException("No puede haber campos vacios");
        }
        return this.se1.crearUsuario(usuario);
    }
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        if (usuario.getUsername() == null || usuario.getUsername().isEmpty() ||
                    usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
            throw new IllegalArgumentException("No puede haber campos vacios");
        }
        return this.se1.login(usuario);
    }
}
