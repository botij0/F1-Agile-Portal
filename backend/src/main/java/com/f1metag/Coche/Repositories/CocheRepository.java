package com.f1metag.Coche.Repositories;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Equipo.Models.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CocheRepository extends JpaRepository<Coche, Long>
{

    Optional<Object> findByNombre(String nombre);

    List<Coche> findCochesByEquipo(Equipo equipo);
}
