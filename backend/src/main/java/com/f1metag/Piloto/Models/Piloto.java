package com.f1metag.Piloto.Models;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Pais.Models.Pais;
import com.f1metag.Votaciones.Models.Opcion;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pilotos")
public class Piloto {
    @Id
    @GeneratedValue
    Long id;
    String nombre;
    String apellidos;
    String siglas;
    Integer dorsal;
    String foto;
    String twitter;
    Pais pais;
    Boolean activo;

    @OneToOne
    Opcion opcion;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "equipo_id", nullable = false)
    @JsonIgnoreProperties({ "coches", "pilotos" })
    @OnDelete(action = OnDeleteAction.CASCADE)
    Equipo equipo;
}
