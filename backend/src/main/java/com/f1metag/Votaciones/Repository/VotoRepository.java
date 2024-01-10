package com.f1metag.Votaciones.Repository;

import com.f1metag.Votaciones.Models.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Long>
{

    Optional<Object> findByEmailAndVotacionId(String email, Long votacionId);
}
