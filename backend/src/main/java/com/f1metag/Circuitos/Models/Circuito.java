package com.f1metag.Circuitos.Models;

import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Pais.Models.Pais;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="circuitos")
public class Circuito {
    @Id
    @GeneratedValue
    Long id;
    String nombre;
    String ciudad;
    Pais pais;
    String trazado;
    Integer numeroVueltas;
    Integer longitud;
    Integer curvasLentas;
    Integer curvasMedias;
    Integer curvasRapidas;
    @Temporal(TemporalType.TIMESTAMP)
    Date fecha;

    @ManyToMany
    Set<Equipo> equipos;

    public void addNewEquipo(Equipo equipo) {
        this.equipos.add(equipo);
    }
}
