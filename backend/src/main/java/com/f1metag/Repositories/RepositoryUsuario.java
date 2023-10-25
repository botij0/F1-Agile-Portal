package com.f1metag.Repositories;

import com.f1metag.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryUsuario extends JpaRepository<Usuario, Long>{
    Usuario findByUsername(String username);
    Usuario findByEmail(String email);
}
