package com.f1metag.Votaciones.Repository;

import com.f1metag.Votaciones.Models.Opcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpcionRepository extends JpaRepository<Opcion, Long>
{
}
