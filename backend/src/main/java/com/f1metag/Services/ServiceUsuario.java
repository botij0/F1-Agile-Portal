package com.f1metag.Services;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.f1metag.Entities.Rol;
import com.f1metag.Entities.Usuario;
import com.f1metag.Repositories.RepositoryRol;
import com.f1metag.Repositories.RepositoryUsuario;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ServiceUsuario {

    private RepositoryUsuario repository;
    private RepositoryRol repositoryRol;

    public ServiceUsuario(RepositoryUsuario repository) {
        this.repository = repository;
    }
    public List<Usuario> getAll() {
        return this.repository.findAll();
    }

    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        if (usuario.getRol() == null){
            Rol defaultRol = repositoryRol.findById(1L);
            usuario.setRol(defaultRol);
        }
        if (usuario.getUsername() == null || usuario.getUsername().isEmpty() ||
                usuario.getEmail() == null || usuario.getEmail().isEmpty() ||
                usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
            throw new IllegalArgumentException("No puede haber campos vacios");
        }

        // Encrypt password
         usuario.setPassword(BCrypt.withDefaults().hashToString(12, usuario.getPassword().toCharArray()));

        // Check username length
        if (usuario.getUsername().length() < 4) {
            throw new IllegalArgumentException("El nombre de usuario debe tener al menos 4 caracteres");
        }

        // Save user
        return this.repository.save(usuario);
    }

    public Usuario login(@RequestBody Usuario usuario) {
        if (usuario.getUsername() == null || usuario.getUsername().isEmpty() ||
                usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
            throw new IllegalArgumentException("No puede haber campos vacios");
        }

        // Find user by username
        Usuario user = this.repository.findByUsername(usuario.getUsername());

        // Check if user exists
        if (user == null) {
            throw new IllegalArgumentException("El usuario no existe");
        }

        // Check if password is correct
        if (!BCrypt.verifyer().verify(usuario.getPassword().toCharArray(), user.getPassword()).verified) {
            throw new IllegalArgumentException("La contraseña es incorrecta");
        }

        // Return user
        return user;
    }
}
