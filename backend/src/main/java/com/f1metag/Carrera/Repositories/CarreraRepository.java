package com.f1metag.Carrera.Repositories;


import com.f1metag.Carrera.Models.Carrera;
import com.f1metag.Circuitos.Models.Circuito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {


    List<Carrera> findByCircuito(Circuito circuito);
}
