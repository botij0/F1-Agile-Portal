package com.f1metag.Votaciones.Models;

import com.f1metag.Piloto.Models.Piloto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JoinColumn(name = "votacion_id")
    @JsonIgnore
    private Votacion votacion;

    @OneToMany(mappedBy = "opcion", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Voto> votos;

    @OneToOne
    @JoinColumn(name = "piloto_id")
    private Piloto piloto;

    public long getTotalVotos() {
        return votos.size();
    }








}
