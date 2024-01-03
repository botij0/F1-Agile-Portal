package com.f1metag.Votaciones.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="votaciones")
public class Votacion
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "titulo", nullable = false, length = Integer.MAX_VALUE)
    private String titulo;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @Column(name = "limite", nullable = false)
    private Instant limite;

    @Builder.Default
    @OneToMany(mappedBy = "votacion")
    private List<Opcion> opciones = new ArrayList<>();

    public long getTotalVotos() {
        return opciones.stream().mapToLong(Opcion::getTotalVotos).sum();
    }

    public List<Opcion> getOpciones() {
        if (this.opciones == null) {
            this.opciones = new ArrayList<>();
        }
        return this.opciones;
    }


}
