package com.f1metag.Carrera.Models;

import com.f1metag.Circuitos.Models.Circuito;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="carreras")
public class Carrera {
    @Id
    @GeneratedValue
    Long id;
    LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "circuito_id")
    @JsonIgnoreProperties("carreras")
    private Circuito circuito;

    @Transient
    Integer temporada;

    public Integer getTemporada() {
        return fecha.getYear();
    }









}
