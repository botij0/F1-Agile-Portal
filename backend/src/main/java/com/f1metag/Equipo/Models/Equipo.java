package com.f1metag.Equipo.Models;

import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Coche.Models.Coche;
import com.f1metag.Piloto.Models.Piloto;

import com.f1metag.Usuario.Models.Usuario;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="equipos")
public class Equipo {
    @Id
    @GeneratedValue
    Long id;
    String nombre;
    String logo;
    String twitter;


    @OneToMany(mappedBy = "equipo", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"equipo"})
    private List<Piloto> pilotos;

    @OneToMany(mappedBy = "equipo", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"equipo"})
    private List<Usuario> usuarios;

    @OneToMany(mappedBy = "equipo", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"equipo"})
    List<Coche> coches;
}
