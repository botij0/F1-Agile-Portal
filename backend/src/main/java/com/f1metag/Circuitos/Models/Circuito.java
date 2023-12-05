package com.f1metag.Circuitos.Models;

import com.f1metag.Carrera.Models.Carrera;
import com.f1metag.Pais.Models.Pais;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import java.util.stream.Collectors;

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
    String granPremio;


    @OneToMany(mappedBy = "circuito", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("circuito")
    private List<Carrera> carreras;

    @Transient
    Integer temporadas;

    @Transient
    String temporadasInterv;
    public Long getTemporadas() {
        if (carreras == null ||
                carreras.isEmpty()) {
            return 0L;
        }
       return carreras.stream().mapToInt(Carrera::getTemporada).distinct().count();
    }
    public String getTemporadasInterv() {
        // Si no hay carreras, no hay temporadas que mostrar
        if (carreras == null ||
                carreras.isEmpty()) {
            return "No hay temporadas";
        }

        // Si hay carreras, pero solo una, se muestra la temporada (el año) de esa carrera
        if (carreras.size() == 1) {
            return carreras.stream().mapToInt(Carrera::getTemporada).distinct().findFirst().orElse(0) + "";
        }

        // Si hay más de una temporada, y son consecutivas, se muestra el intervalo de temporadas (año inicial - año final)
        List<Integer> temporadas = carreras.stream().mapToInt(Carrera::getTemporada).distinct().sorted().boxed().collect(Collectors.toList());
        if (temporadas.get(0) + temporadas.size() - 1 == temporadas.get(temporadas.size() - 1)) {
            return temporadas.get(0) + " - " + temporadas.get(temporadas.size() - 1);
        }

        // Si hay más de una temporada, y no son consecutivas, se muestra la lista de temporadas (año1, año2, año3, ...)
        return temporadas.stream().map(Object::toString).collect(Collectors.joining(", "));

      }

    @Transient
    Pais paisNombre;
    public String getPaisNombre() {
        if (pais == null ||
                pais.getName().isEmpty()) {
            return "No hay país";
        }

        return pais.getName();
    }

}
