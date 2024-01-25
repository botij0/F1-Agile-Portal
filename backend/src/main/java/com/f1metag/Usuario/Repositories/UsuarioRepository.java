package com.f1metag.Usuario.Repositories;

import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Usuario.Models.Rol;
import com.f1metag.Usuario.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);
    Optional<ArrayList<Usuario>> findByEstadoFalse();
    Optional<ArrayList<Usuario>> findByRolAndEquipoIsNull(Rol rol);

}
