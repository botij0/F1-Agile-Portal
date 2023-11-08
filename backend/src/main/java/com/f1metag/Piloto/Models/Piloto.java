package com.f1metag.Piloto.Models;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Pais.Models.Pais;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="pilotos")
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


    @ManyToOne(fetch = FetchType.EAGER)
            @JsonBackReference
    Equipo equipo;

    @OneToOne
    Coche coche;


}
