package com.f1metag.Votaciones.Repository;

import com.f1metag.Votaciones.Models.Votacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VotacionRepository extends JpaRepository<Votacion, Long>
{
}
