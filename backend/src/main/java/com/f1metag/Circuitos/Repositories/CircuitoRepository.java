package com.f1metag.Circuitos.Repositories;


import com.f1metag.Circuitos.Models.Circuito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CircuitoRepository extends JpaRepository<Circuito, Long> {

}
