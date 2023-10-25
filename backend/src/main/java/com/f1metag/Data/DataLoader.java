package com.f1metag.Data;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.f1metag.Entities.Rol;
import com.f1metag.Entities.Usuario;
import com.f1metag.Repositories.RepositoryRol;
import com.f1metag.Repositories.RepositoryUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private final RepositoryRol rolRepository;
    private final RepositoryUsuario userRepository;

    @Autowired
    public DataLoader(RepositoryRol rolRepository, RepositoryUsuario userRepository) {
        this.rolRepository = rolRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Check if roles are already seeded
        if (rolRepository.count() == 0) {
            // Create and save an initial role
            Rol defaultRole = new Rol();
            defaultRole.setId(1); // Set the role id
            defaultRole.setNombre("Administrador"); // Set the role name
            rolRepository.save(defaultRole);

            Rol defaultRole2 = new Rol();
            defaultRole2.setId(2); // Set the role id
            defaultRole2.setNombre("Usuario"); // Set the role name
            rolRepository.save(defaultRole2);


            // Create and save an initial user with the default role
            Usuario adminUser = new Usuario();
            adminUser.setNombre("Admin User"); // Set user details
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(BCrypt.withDefaults().hashToString(12, "admin".toCharArray())); // Encrypt password
            adminUser.setRol(defaultRole); // Set the user role
            adminUser.setEstado(true);
             userRepository.save(adminUser);
        }
    }
}
