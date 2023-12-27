package com.f1metag.Votaciones.Repository;

import com.f1metag.Votaciones.Models.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Long>
{
}
