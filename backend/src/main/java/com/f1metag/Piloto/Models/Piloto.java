package com.f1metag.Piloto.Models;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Pais.Models.Pais;
import com.f1metag.Votaciones.Models.Opcion;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="pilotos")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

    @ManyToOne
    @JoinColumn(name = "equipo_id", referencedColumnName = "id")
    private Equipo equipo;

    @OneToOne
    Coche coche;

    @OneToOne
    Opcion opcion;

}
