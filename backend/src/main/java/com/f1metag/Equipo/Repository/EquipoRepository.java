package com.f1metag.Equipo.Repository;

import com.f1metag.Equipo.Models.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long>
{

}
