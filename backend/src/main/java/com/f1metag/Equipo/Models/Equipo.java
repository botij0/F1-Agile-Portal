package com.f1metag.Equipo.Models;

import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Coche.Models.Coche;
import com.f1metag.Piloto.Models.Piloto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
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


    //@OneToMany(cascade = CascadeType.ALL)
    //List<Piloto> pilotos;

    //@OneToMany(cascade = CascadeType.ALL)
    //List<Coche> coches;
}
