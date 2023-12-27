package com.f1metag.Votaciones.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="votaciones")
public class Votacion
{
    @Id
    @GeneratedValue
    long id;

    @Column(name = "permalink", length = Integer.MAX_VALUE)
    private String permalink;

    @Column(name = "titulo", nullable = false, length = Integer.MAX_VALUE)
    private String titulo;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @Column(name = "limite", nullable = false)
    private Instant limite;

    @OneToMany(mappedBy = "votacion", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Opcion> opciones;

    @OneToMany(mappedBy = "votacion", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Voto> votos;

}
