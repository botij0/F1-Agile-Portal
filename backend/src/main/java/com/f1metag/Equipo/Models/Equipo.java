package com.f1metag.Equipo.Models;

import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Coche.Models.Coche;
import com.f1metag.Piloto.Models.Piloto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Equipo {
    @Id
    @GeneratedValue
    Long id;
    String nombre;
    String logo;
    String twitter;


    @OneToMany(mappedBy = "equipo", fetch = FetchType.EAGER)
    private List<Piloto> pilotos;

    @OneToMany(mappedBy = "equipo")
             @JsonManagedReference
    List<Coche> coches;
}
