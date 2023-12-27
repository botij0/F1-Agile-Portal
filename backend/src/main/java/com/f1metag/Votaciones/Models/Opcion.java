package com.f1metag.Votaciones.Models;

import com.f1metag.Piloto.Models.Piloto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="opciones")
public class Opcion
{
    @Id
    @GeneratedValue
    long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "votacion_id", nullable = false)
    @JsonBackReference
    private Votacion votacion;

    @Column(name = "texto", nullable = false, length = Integer.MAX_VALUE)
    private String texto;

    @Column(name = "imagen_piloto", length = Integer.MAX_VALUE)
    private String imagenPiloto;

    @Column(name = "imagen_escuderia", length = Integer.MAX_VALUE)
    private String imagenEscuderia;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "piloto_id", nullable = false)
    @JsonBackReference
    private Piloto piloto;

    @OneToMany(mappedBy = "opcion")
    @JsonManagedReference
    private List<Voto> votos;

}
