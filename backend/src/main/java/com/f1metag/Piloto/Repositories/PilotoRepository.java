package com.f1metag.Piloto.Repositories;

import com.f1metag.Piloto.Models.Piloto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PilotoRepository extends JpaRepository<Piloto, Long> {

}
