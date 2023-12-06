package com.f1metag.Carrera.Repositories;


import com.f1metag.Carrera.Models.Carrera;
import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Noticias.Models.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {

    List<Carrera> findByCircuito(Circuito circuito);

    @Query(value = "SELECT * FROM carreras order by fecha asc", nativeQuery = true)
    ArrayList<Carrera> getCarrerasOrdenadas();
}
